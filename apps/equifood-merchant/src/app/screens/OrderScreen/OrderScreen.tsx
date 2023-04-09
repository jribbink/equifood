import { Box, Button, Divider, HStack, Text, useTheme } from 'native-base';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ProgressStep,
  ProgressSteps,
  OrderView,
  useAxios,
  useOrder,
  CircleButton,
} from '@equifood/ui-shared';
import type { RootNavigationProps } from '../../layouts/RootLayout';
import { ORDER_STATUS } from '@equifood/api-interfaces';

function OrderScreen({ navigation, route }: RootNavigationProps<'order'>) {
  const { order, mutate } = useOrder(route.params.order.id);
  const theme = useTheme();
  const axios = useAxios();

  async function setStatus(status: ORDER_STATUS) {
    if (!order) return;
    mutate({ ...order, status }, { revalidate: false });
    return await axios.post(`/orders/${order?.id}/status`, { status });
  }

  useEffect(() => {
    if (!order) return;
    navigation.setOptions({
      headerTitle: `Order #${order?.id} (${ORDER_STATUS[
        order?.status
      ].toUpperCase()})`,
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

  return (
    <Box
      height="full"
      backgroundColor="white"
      onLayout={(e) => setViewHeight(e.nativeEvent.layout.height)}
    >
      <ScrollView
        scrollEventThrottle={0.1}
        scrollIndicatorInsets={{ right: 1 }}
      >
        <Box
          position="relative"
          minH={(viewHeight ?? 0) + 10}
          borderRadius="10px"
          backgroundColor="white"
        >
          {order.status === ORDER_STATUS.pending ? (
            <HStack space="10" justifyContent="center" py="4">
              <CircleButton
                color={theme.colors.danger[500]}
                iconName="close-circle"
                text="Reject"
                onPress={() => setStatus(ORDER_STATUS.cancelled)}
              ></CircleButton>
              <CircleButton
                color={theme.colors.success[500]}
                iconName="checkmark-circle"
                text="Accept"
                onPress={() => setStatus(ORDER_STATUS.confirmed)}
              ></CircleButton>
            </HStack>
          ) : (
            <>
              <ProgressSteps
                steps={steps}
                currentIndex={
                  (steps.findIndex((s) => s.key === order.status) ?? -2) + 1
                }
                cancelled={order.status === ORDER_STATUS.cancelled}
                my="3"
              ></ProgressSteps>
              <StatusButtonGroup
                onStatusChange={setStatus}
                status={order.status}
              ></StatusButtonGroup>
            </>
          )}

          <Divider></Divider>

          <OrderView
            order={order}
            viewHeight={viewHeight}
            merchantMode={true}
          ></OrderView>
        </Box>
      </ScrollView>
    </Box>
  );
}

interface StatusButtonGroupProps {
  onStatusChange: (status: ORDER_STATUS) => void;
  status: ORDER_STATUS;
}

function StatusButtonGroup({ onStatusChange, status }: StatusButtonGroupProps) {
  let updateButtonText = '';
  const updateButtonOnPress = async () => {
    Alert.alert(
      'Order Completion',
      'Please confirm that the order has been completed?',
      [
        {
          text: 'Confirm',
          onPress: () => onStatusChange(ORDER_STATUS.completed),
          style: 'default',
        },
        {
          text: 'Not Yet',
          style: 'cancel',
        },
      ]
    );
  };
  switch (status) {
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

  if (status === ORDER_STATUS.cancelled) return null;

  return (
    <>
      <Button
        minWidth={'20'}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
          borderRadius: 5,
        }}
        onPress={updateButtonOnPress}
      >
        <Text fontWeight={'bold'} fontSize={'15'} color={'white'}>
          {updateButtonText}
        </Text>
      </Button>
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
                onPress: () => onStatusChange(ORDER_STATUS.cancelled),
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
    </>
  );
}

export default OrderScreen;
