import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Text, VStack, Image, HStack, Button } from 'native-base';
import { Alert } from 'react-native';
import { Merchant } from '@equifood/api-interfaces';
import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { useMerchant } from '@equifood/ui-shared';
import { ItemCard } from '@equifood/ui-shared';
import { useFocusEffect } from '@react-navigation/native';
import { CoreNavigationProps } from '../CoreLayout';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

const AButton = Animated.createAnimatedComponent(Button);
const AScrollView = Animated.createAnimatedComponent(ScrollView);
export interface MerchantScreenParams {
  merchant: Merchant;
}

function MerchantScreen({
  navigation,
  route,
}: CoreNavigationProps<'merchant'>) {
  const insets = useSafeAreaInsets();
  const { merchant } = useMerchant(route.params.merchant.id);
  const items = merchant?.items || [];
  const [quantityMap, setQuantityMap] = useState<{ [itemId: string]: number }>(
    {}
  );

  const itemMap = useMemo(() => {
    return new Map(merchant?.items.map((item) => [item.id, item]));
  }, [merchant]);

  const _lastPrice = useRef<number>();
  const totalPrice = useMemo(() => {
    const total = Object.keys(quantityMap).reduce(
      (t, k) => t + quantityMap[k] * (itemMap.get(k)?.price ?? 0),
      0
    );
    if (total !== 0) _lastPrice.current = total;
    return total;
  }, [itemMap, quantityMap]);

  // State reference for beforeRemove callback
  const quantityMapRef = useRef<{ [itemId: string]: number }>({});
  quantityMapRef.current = quantityMap;

  const backConfirmFunc = useCallback(
    (e: any) => {
      // Don't halt navigation if empty order
      if (Object.values(quantityMapRef.current).every((v) => !v)) return;

      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        'Discard order?',
        'Are you sure you want to discard this order?',
        [
          {
            text: "I'm Sure",
            onPress: () => navigation.dispatch(e.data.action),
            style: 'default',
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    },
    [navigation]
  );

  useFocusEffect(
    useCallback(() => {
      navigation.addListener('beforeRemove', backConfirmFunc);
      return () => {
        navigation.removeListener('beforeRemove', backConfirmFunc);
      };
    }, [navigation, backConfirmFunc])
  );

  const bottomInset = useSharedValue(0);
  const checkoutButtonHeight = useSharedValue(0);
  const checkoutTransY = useSharedValue(0);

  useEffect(() => {
    bottomInset.value = insets.bottom;
  }, [insets, bottomInset]);

  useEffect(() => {
    if (totalPrice > 0) {
      checkoutTransY.value = withTiming(0, { duration: 500 });
    } else {
      checkoutTransY.value = withTiming(checkoutButtonHeight.value, {
        duration: 500,
      });
    }
  }, [totalPrice, checkoutTransY, checkoutButtonHeight]);

  const styles = {
    checkoutButton: useAnimatedStyle(() => ({
      transform: [{ translateY: checkoutTransY.value }],
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    })),
    scrollView: useAnimatedStyle(() => ({
      marginBottom: interpolate(
        checkoutTransY.value,
        [0, checkoutButtonHeight.value],
        [checkoutButtonHeight.value, 0]
      ),
      paddingBottom: interpolate(
        checkoutTransY.value,
        [0, checkoutButtonHeight.value],
        [bottomInset.value, 0]
      ),
    })),
  };

  if (!merchant) return null;

  return (
    <Box height="full">
      <AScrollView testID="view" style={styles.scrollView}>
        <Box h="200">
          <Image
            width="100%"
            height="200"
            source={{
              uri: merchant.banner_url,
            }}
            alt={merchant.name}
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            borderTopRadius="5"
          />
          <Box flex={1} justifyContent="flex-end" p="1.5">
            <HStack>
              <Image
                source={{ uri: merchant.logo_url }}
                alt={merchant.name}
                backgroundColor="white"
                borderRadius="full"
                width="16"
                height="16"
              ></Image>
              <VStack padding="0">
                <HStack>
                  <Text
                    style={{
                      textShadowColor: 'black',
                      textShadowOffset: { width: -3, height: 3 },
                      textShadowRadius: 3,
                    }}
                    color="white"
                    testID="merchant-name"
                    fontWeight="bold"
                    fontSize="30"
                    marginTop="3"
                    marginLeft="5"
                  >
                    {merchant.name}
                  </Text>
                </HStack>

                <Text
                  style={{
                    textShadowColor: 'black',
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 3,
                  }}
                  color="white"
                  fontSize="15"
                  marginLeft="5"
                >
                  {merchant.description}
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Box>
        <Box>
          <VStack bgColor="white" p="1">
            <Text fontSize="15" marginLeft="1">
              {merchant.location.address}
            </Text>
            <Text fontSize="20" marginLeft="1" fontWeight="bold">
              {'LATEST PICK UP: ' +
                merchant.deadline?.toLocaleDateString(undefined, {
                  hour: 'numeric',
                  minute: '2-digit',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
            </Text>
          </VStack>
        </Box>

        <VStack space="4" m="4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              quantity={quantityMap[item.id] ?? 0}
              onQuantityChange={(newQuantity) =>
                setQuantityMap((currentValue) => ({
                  ...currentValue,
                  [item.id]: newQuantity,
                }))
              }
            ></ItemCard>
          ))}
          <Box borderRadius="5" testID="desc" shadow="2">
            <HStack
              bgColor="white"
              borderBottomRadius={5}
              shadow="5"
              p="1.5"
              space="2"
            >
              <Text style={{ textAlign: 'center' }}>
                You have reached the end
              </Text>
            </HStack>
          </Box>
        </VStack>
      </AScrollView>
      <AButton
        style={styles.checkoutButton}
        backgroundColor="primary.700"
        onPress={async () => {
          // Don't checkout with no items
          if (totalPrice === 0) return;

          navigation.navigate('orderConfirm', {
            merchant: merchant,
            items: items,
            quantities: quantityMap,
          });
        }}
        onLayout={(e) => {
          checkoutButtonHeight.value = checkoutTransY.value =
            e.nativeEvent.layout.height;
        }}
        padding="15px"
        paddingBottom={`${insets.bottom + 15}px`}
        _text={{
          fontSize: 'xl',
          fontWeight: 'bold',
        }}
      >
        {`Checkout ($${_lastPrice.current?.toFixed(2)})`}
      </AButton>
    </Box>
  );
}

export default MerchantScreen;
