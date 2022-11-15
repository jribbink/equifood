import { Button, Text, View, VStack } from 'native-base';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../../redux/slices/cart-slice';
import { Item, Merchant } from '@equifood/api-interfaces';

interface OrderViewProps {
  items: { quantity: number; item: Item }[];
  merchant: Merchant;
}

function OrderView({ items, merchant }: OrderViewProps) {
  const dispatch = useDispatch();

  const totalPrice = items.reduce(
    (total, { quantity, item }) => total + quantity * item.originalPrice,
    0
  );

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
        {items.map(({ item }) => (
          <View
            testID="CartItem"
            key={item.id}
            alignSelf="stretch"
            style={{
              flexDirection: 'row',
              height: 60,
              padding: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text testID="item-name">{item.name}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text testID="item-newPrice" fontWeight={'bold'}>
                {item.price}
              </Text>
              <Text testID="item-oldPrice" textDecorationLine={'line-through'}>
                {item.originalPrice}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                style={{ backgroundColor: 'red', borderRadius: 30 }}
                accessibilityLabel="Remove item from cart"
                onPress={() => dispatch(removeItem(item))}
              >
                Remove
              </Button>
            </View>
          </View>
        ))}
      </VStack>
      <Text testID="totalPrice" fontSize="20" alignSelf="center" padding="3">
        Total Price: {totalPrice}$
      </Text>
      <Text testID="address" fontSize="20" alignSelf="center" padding="3">
        Address: {merchant?.location?.address}
      </Text>
      <Text testID="pickup" fontSize="20" alignSelf="center" padding="3">
        PickupTime: now-15 min
      </Text>
    </VStack>
  );
}

export default OrderView;
