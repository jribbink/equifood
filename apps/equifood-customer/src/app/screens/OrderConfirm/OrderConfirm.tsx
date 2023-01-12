import { StackScreenProps } from '@react-navigation/stack';
import { Button, ScrollView, Text } from 'native-base';
import OrderView from '../../components/views/OrderView/OrderView';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';

function OrderConfirm({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'orderConfirm'>) {
  const params = route.params; //merchant, items, quantities

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
