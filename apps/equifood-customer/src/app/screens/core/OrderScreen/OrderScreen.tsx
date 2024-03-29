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
  useOrder,
} from '@equifood/ui-shared';
import { ORDER_STATUS } from '@equifood/api-interfaces';
import { CoreNavigationProps } from '../CoreLayout';

function OrderScreen({ navigation, route }: CoreNavigationProps<'order'>) {
  const { order } = useOrder(route.params.order.id);
  const user = useProfile().user;
  const axios = useAxios();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Order Info`,
      headerBackTitle: 'Order List',
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
          top="-10"
          minH={(viewHeight ?? 0) + 10}
          borderRadius="10px"
          backgroundColor="white"
          pt="5"
        >
          <Box flexDirection="row" mx="4" my="2" alignItems="center">
            <Heading>{order.merchant.name}</Heading>
            <Text ml="auto">Reference No. {order?.reference_code}</Text>
          </Box>

          <ProgressSteps
            steps={steps}
            currentIndex={
              (steps.findIndex((s) => s.key === order.status) ?? -2) + 1
            }
            cancelled={order.status === ORDER_STATUS.cancelled}
            my="3"
          ></ProgressSteps>

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
                      onPress: async () => {
                        try {
                          await axios.post('/orders/' + order.id + '/status', {
                            status: ORDER_STATUS.cancelled,
                          });
                          Alert.alert(
                            'Success!',
                            'Order cancelled successfully.'
                          );
                        } catch (e) {
                          Alert.alert(
                            'Failed',
                            'The order could not be cancelled.'
                          );
                        }
                      },
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

          <Divider></Divider>

          <OrderView
            order={order}
            viewHeight={viewHeight}
            merchantMode={false}
          ></OrderView>
        </Box>
      </ScrollView>
    </Box>
  );
}

export default OrderScreen;
