import React from 'react';
import { VStack, ScrollView, Heading, Text, Spacer } from 'native-base';
import { OrderCard, useOrders } from '@equifood/ui-shared';
import { Order } from '@equifood/api-interfaces';
import { useNavigation } from '@react-navigation/native';
import { CoreNavigationProps } from '../../layouts/CoreLayout/CoreNavigatorParams';

const Orders = () => {
  const { orders } = useOrders();
  const navigation =
    useNavigation<CoreNavigationProps<'orders'>['navigation']>();

  const currentOrders =
    orders?.filter((order) => order.status === 'pending') || [];
  const completedOrders =
    orders?.filter(
      (order) => order.status === 'completed' || order.status === 'cancelled'
    ) || [];

  function onOrderPress(order: Order) {
    navigation.navigate('order', { order });
  }

  return (
    <ScrollView p="4">
      {currentOrders.length === 0 && completedOrders.length === 0 ? (
        <Text>There are no orders to show currently.</Text>
      ) : // placeholder, we should have a nice looking component
      null}

      {currentOrders.length > 0 ? (
        <>
          <Heading pb="4">Current Orders</Heading>
          <VStack space={3}>
            {currentOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onPress={onOrderPress}
              ></OrderCard>
            ))}
          </VStack>
        </>
      ) : null}

      <Spacer size="8"></Spacer>

      {completedOrders.length > 0 ? (
        <>
          <Heading pb="4">Completed Orders</Heading>
          <VStack>
            {completedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onPress={onOrderPress}
              ></OrderCard>
            ))}
          </VStack>
        </>
      ) : null}
    </ScrollView>
  );
};

export default Orders;
