import { StackScreenProps } from '@react-navigation/stack';
import { Button, ScrollView, Text } from 'native-base';
import {
  OrderConfirmView,
  SWR_KEY_ORDERS,
  useAxios,
} from '@equifood/ui-shared';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import { Order } from '@equifood/api-interfaces';
import { equifoodTheme } from '@equifood/ui-shared';
import useSWR, { useSWRConfig } from 'swr';

function OrderConfirm({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'orderConfirm'>) {
  const { mutate } = useSWRConfig();
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
        style={{
          backgroundColor: equifoodTheme.colors.primary[700],
          borderRadius: 30,
        }}
        paddingLeft="10"
        paddingRight="10"
        alignSelf="center"
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

          // refresh orders
          mutate(SWR_KEY_ORDERS('self', false));
        }}
      >
        <Text fontSize="24" color="white" fontWeight="bold">
          Confirm & Place Order
        </Text>
      </Button>
    </ScrollView>
  );
}

export default OrderConfirm;
