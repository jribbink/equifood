import { Button, ScrollView, Text } from 'native-base';
import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import OrderView from '../../components/views/OrderView/OrderView';
import { addItem, setMerchant } from '../../redux/slices/cart-slice';
import { AppDispatch, RootState } from '../../redux/store';

//This is the test initialization
const i1 = {
  id: '1',
  name: 'Burger',
  price: 3.99,
  originalPrice: 4.99,
  description: 'That is one tasty burger!',
  allergies: 'None',
  quantity: 1,
};
const i2 = {
  id: '2',
  name: 'Drink',
  price: 3.99,
  originalPrice: 4.99,
  description: 'A drink to go with your tasty burger!',
  allergies: 'None',
  quantity: 1,
};

const m = {
  id: '1',
  name: 'Test',
  address: '1234 st',
  banner_url: 'https://example.com/foo.png',
};

const Confirm = () => {
  const store = useStore<RootState>();
  const items = useSelector((state) => store.getState().cart.items);
  const merchant = useSelector((state) => store.getState().cart.merchant);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(addItem({ quantity: 1, item: i1 }));
    dispatch(addItem({ quantity: 1, item: i2 }));
    dispatch(setMerchant(m));
  }, [dispatch]);

  return (
    <ScrollView>
      <OrderView items={items} quantity={1} merchant={merchant}></OrderView>
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

export default OrderConfirm;
