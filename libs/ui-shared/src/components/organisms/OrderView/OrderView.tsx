import { Text, HStack, VStack, Box } from 'native-base';
import { Item, Merchant } from '@equifood/api-interfaces';
import { CheckoutItemCard } from '../../molecules/cards/CheckoutItemCard/CheckoutItemCard';

interface OrderViewProps {
  items: Item[];
  quantities: { [itemId: string]: number };
  merchant: Merchant;
}

export function OrderView({ items, quantities, merchant }: OrderViewProps) {
  let totalPrice = 0;
  for (const itemId in quantities) {
    const item = items.find((item) => item.id === itemId);
    const qt = quantities[itemId];
    if (item) {
      totalPrice += qt * item.price;
    }
  }
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
          backgroundColor="primary.500"
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
          Now - 15 min
        </Text>
      </HStack>

      <VStack paddingTop={5}>
        {(items || []).map((item) => (
          <CheckoutItemCard
            key={item.id}
            item={item}
            quantity={quantities[item.id] ?? 0}
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
