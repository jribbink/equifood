import { StackScreenProps } from '@react-navigation/stack';
import { Button, ScrollView, Text } from 'native-base';
import { useDispatch, useSelector, useStore } from 'react-redux';
import OrderView from '../../components/views/OrderView/OrderView';
import { AppDispatch, RootState } from '../../redux/store';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';

function Confirm({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'orderConfirm'>) {
  const store = useStore<RootState>();
  const params = route.params; //merchant, items, quantities

  const dispatch = useDispatch<AppDispatch>();

  return (
    <ScrollView>
      <OrderView
        items={params.items}
        quantities={params.quantities}
        merchant={params.merchant}
      ></OrderView>
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
}

export default OrderConfirm;
