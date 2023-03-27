import { Box, Button, Divider, Heading, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ProgressStep,
  ProgressSteps,
  OrderView,
  useAxios,
  useOrder,
} from '@equifood/ui-shared';
import type { RootNavigationProps } from '../../layouts/RootLayout';
import { ORDER_STATUS } from '@equifood/api-interfaces';

function OrderScreen({ navigation, route }: RootNavigationProps<'order'>) {
  const { order } = useOrder(route.params.order.id);
  const axios = useAxios();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Order #${order?.id}`,
    });
  }, [navigation, order]);

  const steps: ProgressStep<ORDER_STATUS>[] = [
    {
      text: 'Pending',
      key: ORDER_STATUS.pending,
    },
    {
      text: 'Confirmed',
      key: ORDER_STATUS.confirmed,
    },
    {
      text: 'Completed',
      key: ORDER_STATUS.completed,
    },
  ];

  const [viewHeight, setViewHeight] = useState<number>(0);

  if (!order) return null;

  let updateButtonText = '';
  const updateButtonOnPress = async () => {
    Alert.alert(
      'Order Completion',
      'Please confirm that the order has been completed?',
      [
        {
          text: 'Confirm',
          onPress: async () => {
            await axios.post('/orders/' + order.id + '/status', {
              status: ORDER_STATUS.completed,
            });
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
    case ORDER_STATUS.pending:
      updateButtonText = 'Complete Order';
      break;
    case ORDER_STATUS.cancelled:
      updateButtonText = 'Order Cancelled';
      break;
    case ORDER_STATUS.completed:
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
              (steps.findIndex((s) => s.key === order.status) ?? -2) + 1
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
                        await axios.post('/orders/' + order.id + '/status', {
                          status: ORDER_STATUS.cancelled,
                        }),
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
