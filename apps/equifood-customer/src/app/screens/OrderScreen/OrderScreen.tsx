import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Divider, Heading, HStack, Text } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ProgressSteps, {
  ProgressStep,
} from '../../components/visuals/ProgressSteps/ProgressSteps';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import MapView from 'react-native-maps';

function OrderScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'order'>) {
  const order = route.params.order;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Order #${order.id}`,
    });
  }, [navigation, order]);
  const steps: ProgressStep[] = [
    {
      text: 'Pending',
    },
    {
      text: 'Confirmed',
    },
    {
      text: 'Completed',
    },
  ];

  const baseBannerHeight = 200;
  const [imageHeight, setImageHeight] = useState<number>(baseBannerHeight);
  const scrollViewRef = useRef<ScrollView | null>(null);

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const offset = event.nativeEvent.contentOffset.y;
    setImageHeight(
      Math.min(Math.max(baseBannerHeight - offset, 0), baseBannerHeight)
    );
  }

  function handleScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const offset = event.nativeEvent.contentOffset.y;
    if (offset > (0.4 * baseBannerHeight) / 2) {
      scrollViewRef.current?.scrollTo({
        y: baseBannerHeight / 2,
        animated: true,
      });
    } else {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  }

  function handleScrollStart(event: NativeSyntheticEvent<NativeScrollEvent>) {
    scrollViewRef.current?.scrollTo({ y: event.nativeEvent.contentOffset.y });
  }

  const [viewHeight, setViewHeight] = useState<number>(0);

  return (
    <Box
      height="full"
      backgroundColor="white"
      onLayout={(e) => setViewHeight(e.nativeEvent.layout.height)}
    >
      {/*onScroll={handleScroll}
        onScrollEndDrag={handleScrollEnd}
  onScrollBeginDrag={handleScrollStart}*/}
      <ScrollView ref={scrollViewRef} scrollEventThrottle={0.1}>
        {/*<ZStack height={imageHeight + 'px'} overflow="hidden">
          {/*<Image
            source={{ uri: order.merchant.banner_url }}
            alt={order.merchant.name}
            width="full"
            height={imageHeight + 'px'}
            overflow="hidden"
  ></Image>}
          <MapView style={{ width: '100%', height: '100%' }}></MapView>
          <Svg height="100%" width="100%">
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0.5" stopColor={'#000000'} stopOpacity={0.7} />
                <Stop offset="1" stopColor={'#000000'} stopOpacity={0.85} />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </ZStack>*/}

        <Box
          position="relative"
          top="-10"
          minH={(viewHeight ?? 0) + 10}
          borderRadius="10px"
          backgroundColor="white"
        >
          <Heading textAlign="center" pt="5" color="green.800">
            Order Progress
          </Heading>
          <ProgressSteps
            steps={steps}
            currentIndex={1}
            cancelled={true}
            height="75"
          ></ProgressSteps>

          <Divider></Divider>

          <Box p="4">
            <Text fontSize="md" pb="2">
              Order Info
            </Text>
            <Box width="full">
              <Box>
                <Box flexDirection="row" width="full" backgroundColor="red">
                  <Text>{`${order.item.quantity}x ${order.item.item.name}`}</Text>
                  <Text ml="auto">
                    ${(order.item.item.price * order.item.quantity).toFixed(2)}
                  </Text>
                  <Text strikeThrough={true} color="red.600" ml="2">
                    $
                    {(
                      order.item.item.originalPrice * order.item.quantity
                    ).toFixed(2)}
                  </Text>
                </Box>
                {order.item.item.description ? (
                  <Box pl="5">
                    <Text lineBreakMode="tail">
                      {order.item.item.description}
                    </Text>
                  </Box>
                ) : null}
              </Box>
            </Box>
          </Box>

          <Divider></Divider>
          <Box p="4">
            <Box flexDirection="row">
              <Text color="red.600">Your savings</Text>
              <Text color="red.600" ml="auto">
                - $
                {(
                  (order.item.item.originalPrice - order.item.item.price) *
                  order.item.quantity
                ).toFixed(2)}
              </Text>
            </Box>
            <Box flexDirection="row">
              <Text>Subtotal</Text>
              <Text ml="auto">
                ${(order.item.item.price * order.item.quantity).toFixed(2)}
              </Text>
            </Box>
            <Box flexDirection="row">
              <Text>GST</Text>
              <Text ml="auto">
                $
                {(order.item.item.price * order.item.quantity * 0.12).toFixed(
                  2
                )}
              </Text>
            </Box>
            <Box flexDirection="row">
              <Text>Total</Text>
              <Text ml="auto">
                $
                {(order.item.item.price * order.item.quantity * 1.12).toFixed(
                  2
                )}
              </Text>
            </Box>
          </Box>
          <Divider></Divider>
          <Box p="4">
            <Box>
              <Text fontSize="md" pb="2">
                Pickup Instructions
              </Text>
              <Text>
                Please pickup at {order.merchant.location.address} before{' '}
                {order.deadline.toLocaleDateString(undefined, {
                  hour: 'numeric',
                  minute: '2-digit',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </Text>
              <Text pb="4">Payment: In-person</Text>
              {viewHeight ? (
                <MapView
                  style={{ width: '100%', height: viewHeight * 0.5 }}
                ></MapView>
              ) : null}
            </Box>
          </Box>
          <Divider></Divider>
          <Box p="4">
            <Text>{`Placed ${order.order_date.toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              minute: '2-digit',
              hour: 'numeric',
              timeZoneName: 'short',
            })}`}</Text>
          </Box>
          <HStack p="5" flexDirection="row" alignItems="center" space="3">
            <FontAwesome
              name="recycle"
              color="green"
              style={{
                fontSize: 50,
              }}
            ></FontAwesome>
            <Text
              flexShrink={1}
              fontSize="sm"
              lineBreakMode="head"
              textBreakStrategy="highQuality"
            >
              Congratulations, you saved $
              {(
                (order.item.item.originalPrice - order.item.item.price) *
                order.item.quantity
              ).toFixed(2)}{' '}
              today. Thank you for your contribution to reducing food insecurity
              across Canada.
            </Text>
          </HStack>
        </Box>
      </ScrollView>
    </Box>
  );
}

function OrderInfo() {}

function OrderPrice() {}

export default OrderScreen;
