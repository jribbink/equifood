import { Text, HStack, VStack, Box } from 'native-base';
import { Item, Merchant } from '@equifood/api-interfaces';
import { CheckoutItemCard } from '../../molecules/cards/CheckoutItemCard/CheckoutItemCard';
import React, { useState, useEffect } from 'react';

interface OrderViewProps {
  items: Item[];
  quantities: { [itemId: string]: number };
  merchant: Merchant;
}

export function OrderConfirmView({
  items,
  quantities,
  merchant,
}: OrderViewProps) {
  let totalPrice = 0;
  for (const itemId in quantities) {
    const item = items.find((item) => item.id === itemId);
    const qt = quantities[itemId];
    if (item) {
      totalPrice += qt * item.price;
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const [seconds, setSeconds] = useState(900);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }, []);


  return (
    <VStack>
      <HStack>
        <Text fontSize="20" padding={3} flex={1}>
          Pick up from
        </Text>
        <Text
          testID="restaurant"
          fontWeight="extrabold"
          fontSize="20"
          paddingTop={3}
          backgroundColor="green"
          flex={2}
        >
          {merchant.name}
        </Text>
      </HStack>
      <HStack>
        <Text fontSize="20" padding={3} flex={1}>
          Located at
        </Text>
        <Text
          fontWeight="bold"
          testID="address"
          fontSize="20"
          alignSelf="center"
          flex={2}
        >
          {merchant?.location?.address}
        </Text>
      </HStack>

      <HStack>
        <Text
          fontSize="20"
          paddingTop={3}
          paddingLeft={3}
          paddingRight={3}
          flex={1}
        >
          By 
        </Text>
        <Text fontSize="20" marginTop="3" fontWeight={'bold'} flex={2}>
          Time remaining: {formatTime(seconds)}
        </Text>
      </HStack>

        

      <VStack paddingTop={5}>
        {(items || [])
          .filter((item) => quantities[item.id])
          .map((item) => (
            <CheckoutItemCard
              key={item.id}
              item={item}
              quantity={quantities[item.id]}
            ></CheckoutItemCard>
          ))}
      </VStack>
      <HStack alignSelf={'flex-end'}>
        <Text textAlign={'right'} alignSelf="center" fontSize={20}>
          Total:
        </Text>
        <Text
          testID="totalPrice"
          fontWeight="bold"
          fontSize="25"
          alignSelf="center"
          padding="3"
        >
          $ {totalPrice.toFixed(2)}
        </Text>
      </HStack>
    </VStack>
  );
}
