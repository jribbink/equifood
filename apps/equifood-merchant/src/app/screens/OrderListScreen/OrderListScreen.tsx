import React from 'react';
import { VStack, ScrollView, Heading, Text, Spacer } from 'native-base';
import { OrderCard, useOrders } from '@equifood/ui-shared';
import { Order, ORDER_STATUS } from '@equifood/api-interfaces';
import { CoreNavigationProps } from '../../layouts/CoreLayout';

export default function OrdersListScreen({
  navigation,
}: CoreNavigationProps<'orders'>) {
  const { orders } = useOrders('self', true);

  const currentOrders =
    orders?.filter(
      (order) =>
        order.status === ORDER_STATUS.pending ||
        order.status === ORDER_STATUS.confirmed
    ) || [];
  const completedOrders =
    orders?.filter(
      (order) =>
        order.status === ORDER_STATUS.completed ||
        order.status === ORDER_STATUS.cancelled
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
          <VStack space={3}>
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
}
