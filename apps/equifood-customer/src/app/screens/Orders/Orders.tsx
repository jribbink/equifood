import React from 'react';
import { VStack, ScrollView, Heading, Text } from 'native-base';
import { useOrders } from '../../hooks/useOrders';
import OrderCard from '../../components/cards/OrderCard/OrderCard';

const Orders = () => {
  const { orders } = useOrders();

  const currentOrders =
    orders?.filter((order) => order.status === 'pending') || [];
  const completedOrders =
    orders?.filter((order) => order.status === 'completed' || 'cancelled') ||
    [];

  return (
    <ScrollView p="3">
      {currentOrders.length === 0 && completedOrders.length === 0 ? (
        <Text>There are no orders to show currently.</Text>
      ) : // placeholder, we should have a nice looking component
      null}

      {currentOrders.length > 0 ? (
        <>
          <Heading pb="4">Current Orders</Heading>
          <VStack space={3} paddingX={8}>
            {currentOrders.map((order) => (
              <OrderCard key={order.id} order={order}></OrderCard>
            ))}
          </VStack>
        </>
      ) : null}

      {completedOrders.length > 0 ? (
        <>
          <Heading pb="4">Completed Orders</Heading>
          <VStack>
            {completedOrders.map((order) => (
              <OrderCard key={order.id} order={order}></OrderCard>
            ))}
          </VStack>
        </>
      ) : null}
    </ScrollView>
  );
};

export default Orders;
