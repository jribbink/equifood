import { StackScreenProps } from '@react-navigation/stack';
import {
  Box,
  Button,
  Text,
  ScrollView,
  VStack,
  Image,
  Heading,
  HStack,
} from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import { Merchant } from '@equifood/api-interfaces';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useMerchant } from '@equifood/ui-shared';
import { ItemCard } from '@equifood/ui-shared';
import { useFocusEffect } from '@react-navigation/native';

export interface MerchantScreenParams {
  merchant: Merchant;
}

function RestaurantScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'merchant'>) {
  const { merchant } = useMerchant(route.params.merchant.id);
  const [quantityMap, setQuantityMap] = useState<{ [itemId: string]: number }>(
    {}
  );

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
        console.log('removed listener');
      };
    }, [navigation, backConfirmFunc])
  );

  if (!merchant) return null;
  const items = merchant.items;

  return (
    <Box height="full">
      <ScrollView testID="view" flex={1}>
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
          {(items || []).map((item) => (
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
      </ScrollView>
      <Button
        style={{ backgroundColor: 'forestgreen' }}
        onPress={async () => {
          // check if all values are 0
          if (Object.entries(quantityMap).every((item) => item[1] === 0)) {
            alert('Please choose at least one item before continuing.');
          } else {
            navigation.navigate('orderConfirm', {
              merchant: merchant,
              items: items,
              quantities: quantityMap,
            });
          }
        }}
      >
        Order
      </Button>
    </Box>
  );
}

export default RestaurantScreen;
