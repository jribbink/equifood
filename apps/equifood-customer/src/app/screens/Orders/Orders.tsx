import React from 'react';
import { VStack, ScrollView, Heading } from 'native-base';
import { useOrders } from '../../hooks/useOrders';
import OrderCard from '../../components/cards/OrderCard/OrderCard';

const Orders = () => {
  const { orders } = useOrders();

  return (
    <ScrollView p="3">
      <Heading pb="4">Current Orders</Heading>
      <VStack space={3} paddingX={8}>
        {orders
          ?.filter((order) => order.status === 'pending')
          ?.map((order) => (
            <OrderCard key={order.id} order={order}></OrderCard>
          ))}
      </VStack>

      <Heading pb="4">Completed Orders</Heading>
      <VStack>
        {orders
          ?.filter((order) => order.status === 'completed' || 'cancelled')
          ?.map((order) => (
            <OrderCard key={order.id} order={order}></OrderCard>
          ))}
      </VStack>
    </ScrollView>
  );
};

export default Orders;
