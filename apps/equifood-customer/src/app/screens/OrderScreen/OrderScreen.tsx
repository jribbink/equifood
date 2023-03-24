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
} from '@equifood/ui-shared';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import { ORDER_STATUS } from '@equifood/api-interfaces';

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
