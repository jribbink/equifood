import { StackScreenProps } from '@react-navigation/stack';
import { Box, Divider, Heading, Button, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import {
  ProgressStep,
  ProgressSteps,
  OrderView,
  useProfile,
  useAxios,
  MerchantMap,
  equifoodTheme,
} from '@equifood/ui-shared';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import { HStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

function OrderScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'order'>) {
  const order = route.params.order;
  const user = useProfile().user;
  const axios = useAxios();

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

  const [viewHeight, setViewHeight] = useState<number>(0);

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
            <Text fontSize="md" pb="2">
              Order Info
            </Text>
            <Box width="full" flexDirection="column">
              {order.items.map((item) => (
                <Box key={item.item.id}>
                  <Box flexDirection="row" width="full" backgroundColor="red">
                    <Text>{`${item.quantity}x ${item.item.name}`}</Text>
                    <Text ml="auto" strikeThrough={true} color="primary.600">
                      ${(item.item.originalPrice * item.quantity).toFixed(2)}
                    </Text>
                    <Text ml="2">
                      ${(item.item.price * item.quantity).toFixed(2)}
                    </Text>
                  </Box>
                  {item.item.description ? (
                    <Box pl="5">
                      <Text lineBreakMode="tail">{item.item.description}</Text>
                    </Box>
                  ) : null}
                </Box>
              ))}
            </Box>
          </Box>

          <Divider></Divider>
          <Box p="4">
            <Box flexDirection="row">
              <Text color="primary.600">Your savings</Text>
              <Text color="primary.600" ml="auto">
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
              color="primary.500"
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
            <OrderView
              order={order}
              viewHeight={viewHeight}
              merchantMode={false}
            ></OrderView>
          </HStack>
          <Button
            minWidth={'20'}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
              borderRadius: 5,
            }}
            onPress={async () => {
              if (user) {
                // user should always be a thing if we got to this page but VSCode is complaining
                Alert.alert(
                  'Cancel order?',
                  'Are you sure you want to cancel this order?',
                  [
                    {
                      text: "I'm Sure",
                      onPress: async () =>
                        await axios.post('/orders/cancel/' + order.id),
                      style: 'default',
                    },
                    {
                      text: 'No, thanks',
                      style: 'cancel',
                    },
                  ]
                );
              }
            }}
          >
            <Text fontWeight={'bold'} fontSize={'15'} color={'white'}>
              CANCEL ORDER
            </Text>
          </Button>
          {
            //cancel button here
          }
        </Box>
      </ScrollView>
    </Box>
  );
}

export default OrderScreen;
