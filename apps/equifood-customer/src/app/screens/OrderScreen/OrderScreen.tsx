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

          <OrderView
            order={order}
            viewHeight={viewHeight}
            merchantMode={false}
          ></OrderView>
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
