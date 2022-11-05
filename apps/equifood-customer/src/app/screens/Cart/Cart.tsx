import React, { useEffect} from 'react';
import { VStack, ScrollView, Text, Button, View } from 'native-base';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addItem, removeItem, setMerchant } from '../../redux/slices/cart-slice';

//This is the test initialization
const i1 = {
  id: '1',
  name: 'Burger',
  newPrice: 3.99,
  oldPrice: 4.99,
};
const i2 = {
  id: '2',
  name: 'Drink',
  newPrice: 3.99,
  oldPrice: 4.99,
};

const m = {
  id: '1',
  name: 'Test',
  address: '1234 st',
  banner_url: 'https://example.com/foo.png',
};

const Cart = () => {
  const store = useStore<RootState>();
  const dispatch = useDispatch<AppDispatch>();

  //Linking items to stored value
  const items = useSelector((state) => store.getState().cart.items);
  const merchant = useSelector((state) => store.getState().cart.merchant);

  // this runs only on component mount
  useEffect(() => {
    dispatch(addItem(i1));
    dispatch(addItem(i2));
    dispatch(setMerchant(m));
  }, [dispatch]);

  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice += item.newPrice;
  });

  return (
    <ScrollView>
      <Text
        testid="restaurant"
        fontWeight="bold"
        fontSize="24"
        alignSelf="center"
        padding={3}
      >
        {merchant.name}
      </Text>
      <VStack paddingBottom={5}>
        {items.map((item) => (
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
                {item.newPrice}
              </Text>
              <Text testID="item-oldPrice" textDecorationLine={'line-through'}>
                {item.oldPrice}
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
      <Text testid="totalPrice" fontSize="20" alignSelf="center" padding="3">
        Total Price: {totalPrice}$
      </Text>
      <Text testid="address" fontSize="20" alignSelf="center" padding="3">
        Address: {merchant.address}
      </Text>
      <Text testid="pickup" fontSize="20" alignSelf="center" padding="3">
        PickupTime: now-15 min
      </Text>
      <Button
        style={{ backgroundColor: 'cyan', borderRadius: 30 }}
        padding="3"
        accessibilityLabel="Confirm Order"
        onPress={() => alert('checkout')}
      >
        <Text fontSize="24" fontWeight="bold">
          Confirm
        </Text>
      </Button>
    </ScrollView>
  );
};

export default Cart;
