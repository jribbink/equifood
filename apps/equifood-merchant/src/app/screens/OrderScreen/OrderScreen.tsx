import { Box, Button, Divider, Heading, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ProgressStep,
  ProgressSteps,
  OrderView,
  useAxios,
} from '@equifood/ui-shared';
import type { RootNavigationProps } from '../../layouts/RootLayout';

function OrderScreen({ navigation, route }: RootNavigationProps<'order'>) {
  const order = route.params.order;
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

  let updateButtonText = '';
  const updateButtonOnPress = async () => {
    Alert.alert(
      'Order Completion',
      'Please confirm that the order has been completed?',
      [
        {
          text: 'Confirm',
          onPress: () => {
            order.status = 'completed';
          },
          style: 'default',
        },
        {
          text: 'Not Yet',
          style: 'cancel',
        },
      ]
    );
  };
  switch (order.status) {
    case 'pending':
      updateButtonText = 'Complete Order';
      break;
    case 'cancelled':
      updateButtonText = 'Order Cancelled';
      break;
    case 'completed':
      updateButtonText = 'Order Completed';
      break;
    default:
      updateButtonText = 'error';
      break;
  }

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

          <OrderView
            order={order}
            viewHeight={viewHeight}
            merchantMode={true}
          ></OrderView>

          {
            //ready/complete button here
            <Button
              minWidth={'20'}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                borderRadius: 5,
              }}
              onPress={updateButtonOnPress}
            >
              <Text fontWeight={'bold'} fontSize={'15'} color={'white'}>
                {updateButtonText}
              </Text>
            </Button>
          }

          {
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
              }}
            >
              <Text fontWeight={'bold'} fontSize={'15'} color={'white'}>
                CANCEL ORDER
              </Text>
            </Button>
          }
        </Box>
      </ScrollView>
    </Box>
  );
}

export default OrderScreen;
