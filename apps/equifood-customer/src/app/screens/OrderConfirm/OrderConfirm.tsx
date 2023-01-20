import { StackScreenProps } from '@react-navigation/stack';
import { Button, ScrollView, Text } from 'native-base';
import OrderView from '../../components/views/OrderView/OrderView';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import { useAxios } from '../../hooks/useAxios';
import { Order } from '@equifood/api-interfaces';

function OrderConfirm({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'orderConfirm'>) {
  const axios = useAxios();
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
        onPress={async () => {
          const { data } = await axios.post<Order>('/orders', {
            merchant: params.merchant.id,
            items: Object.entries(params.quantities).map(([id, quantity]) => ({
              id,
              quantity,
            })),
          });
          navigation.navigate('core', { screen: 'orders' });
          navigation.navigate('order', { order: data });
        }}
      >
        <Text fontSize="24" fontWeight="bold">
          Confirm & Place Order
        </Text>
      </Button>

      <Button
        onPress={(merchant) => navigation.navigate('merchant', { merchant })}
      >
        Go Back
      </Button>
    </ScrollView>
  );
}

export default OrderConfirm;
