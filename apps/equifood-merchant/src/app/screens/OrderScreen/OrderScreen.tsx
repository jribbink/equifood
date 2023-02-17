import { StackScreenProps } from '@react-navigation/stack';
import { Box, Divider, Heading, HStack, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ProgressStep, ProgressSteps, OrderView } from '@equifood/ui-shared';
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

          <OrderView order={order} viewHeight={viewHeight}></OrderView>
        </Box>
      </ScrollView>
    </Box>
  );
}

export default OrderScreen;
