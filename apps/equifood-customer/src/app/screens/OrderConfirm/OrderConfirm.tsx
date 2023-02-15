import { StackScreenProps } from '@react-navigation/stack';
import { Button, ScrollView, Text } from 'native-base';
import { OrderConfirmView, useAxios } from '@equifood/ui-shared';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import { Order } from '@equifood/api-interfaces';

function OrderConfirm({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'orderConfirm'>) {
  const axios = useAxios();
  const params = route.params; //merchant, items, quantities
  const merchant = params.merchant; //need this for onBackPress because react is stupid

  function onBackPress() {
    navigation.navigate('merchant', { merchant });
  }

  return (
    <ScrollView>
      <OrderConfirmView
        items={params.items}
        quantities={params.quantities}
        merchant={params.merchant}
      ></OrderConfirmView>
      <Button
        style={{ backgroundColor: 'forestgreen', borderRadius: 30 }}
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
        <Text fontSize="24" color="white" fontWeight="bold">
          Confirm & Place Order
        </Text>
      </Button>

      <Button
        style={{ backgroundColor: 'yellowgreen', borderRadius: 30 }}
        onPress={onBackPress}
      >
        <Text fontSize="20" color="white">
          Go Back
        </Text>
      </Button>
    </ScrollView>
  );
}

export default OrderConfirm;
