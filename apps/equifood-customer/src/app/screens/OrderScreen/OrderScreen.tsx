import { FontAwesome } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Divider, Heading, HStack, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ProgressStep,
  ProgressSteps,
  MerchantMap,
  OrderView,
} from '@equifood/ui-shared';
import { Item, OrderedItem } from '@equifood/api-interfaces';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';

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

  const [quantityMap, setQuantityMap] = useState<{ [itemId: string]: number }>(
    {}
  );

  const items: Item[] = [];
  // this is hacky but it works
  order.items.map((ordItem) => {
    setQuantityMap((currentValue) => ({
      ...currentValue,
      [ordItem.item.id]: ordItem.quantity,
    }));
    items.push(ordItem.item);
  });

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

  const [viewHeight, setViewHeight] = useState<number>(0);

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.item.price * item.quantity,
    0
  );
  const originalSubtotal = order.items.reduce(
    (acc, item) => acc + item.item.originalPrice * item.quantity,
    0
  );

  return (
    <Box
      height="full"
      backgroundColor="white"
      onLayout={(e) => setViewHeight(e.nativeEvent.layout.height)}
    >
      <ScrollView scrollEventThrottle={0.1}>
        <Box
          position="relative"
          top="-10"
          minH={(viewHeight ?? 0) + 10}
          borderRadius="10px"
          backgroundColor="white"
          pt="5"
        >
          <Box flexDirection="row" mx="4" my="2" alignItems="center">
            <Heading>{order.merchant.name}</Heading>
            <Text ml="auto">Order #{order.id}</Text>
          </Box>

          <ProgressSteps
            steps={steps}
            currentIndex={
              (steps.findIndex((s) => s.text.toLowerCase() === order.status) ??
                -2) + 1
            }
            cancelled={true}
            my="3"
          ></ProgressSteps>

          <Divider></Divider>

          <Box p="4">
            <OrderView
              items={items}
              quantities={quantityMap}
              merchant={order.merchant}
            ></OrderView>
          </Box>

          <Divider></Divider>
          <Box p="4">
            <Box flexDirection="row">
              <Text color="red.600">Your savings</Text>
              <Text color="red.600" ml="auto">
                - ${(originalSubtotal - subtotal).toFixed(2)}
              </Text>
            </Box>
            <Box flexDirection="row">
              <Text>Subtotal</Text>
              <Text ml="auto">${subtotal.toFixed(2)}</Text>
            </Box>
            <Box flexDirection="row">
              <Text>GST</Text>
              <Text ml="auto">${(subtotal * 0.05).toFixed(2)}</Text>
            </Box>
            <Box flexDirection="row">
              <Text>Total</Text>
              <Text ml="auto">${(subtotal * 1.05).toFixed(2)}</Text>
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
                <MerchantMap
                  darkMode={false}
                  merchants={[order.merchant]}
                  initialRegion={{
                    longitude: order.merchant.location.longitude,
                    latitude: order.merchant.location.latitude,
                    latitudeDelta: 2,
                    longitudeDelta: 2,
                  }}
                  style={{ width: '100%', height: viewHeight * 0.5 }}
                ></MerchantMap>
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
              {(originalSubtotal - subtotal).toFixed(2)} today. Thank you for
              your contribution to reducing food waste across Canada.
            </Text>
          </HStack>
        </Box>
      </ScrollView>
    </Box>
  );
}

export default OrderScreen;
