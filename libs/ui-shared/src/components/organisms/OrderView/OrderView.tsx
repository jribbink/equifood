import { Text, HStack, VStack } from 'native-base';
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
      <Text
        testID="restaurant"
        fontWeight="bold"
        fontSize="24"
        alignSelf="center"
        padding={3}
      >
        {merchant.name}
      </Text>
      <VStack paddingBottom={5}>
        {(items || []).map((item) => (
          <CheckoutItemCard
            key={item.id}
            item={item}
            quantity={quantities[item.id] ?? 0}
          ></CheckoutItemCard>
        ))}
      </VStack>
      <HStack>
        <Text alignSelf="center" fontSize={20}>
          Order Total:
        </Text>
        <Text testID="totalPrice" fontSize="20" alignSelf="center" padding="3">
          $ {totalPrice}
        </Text>
      </HStack>

      <Text testID="address" fontSize="20" alignSelf="center" padding="3">
        Pick up at: {merchant?.location?.address}
      </Text>
      <Text testID="pickup" fontSize="20" alignSelf="center" padding="3">
        PickupTime: Now - 15 min
      </Text>
    </VStack>
  );
}
