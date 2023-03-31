import { Button, ScrollView, Text } from 'native-base';
import { OrderConfirmView, useAxios } from '@equifood/ui-shared';
import { Order } from '@equifood/api-interfaces';
import { equifoodTheme } from '@equifood/ui-shared';
import { CoreNavigationProps } from '../CoreLayout';

function OrderConfirmScreen({
  navigation,
  route,
}: CoreNavigationProps<'orderConfirm'>) {
  const axios = useAxios();
  const params = route.params; //merchant, items, quantities

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
          navigation.navigate('tabs', { screen: 'orders' });
          navigation.navigate('order', { order: data });
        }}
      >
        <Text fontSize="24" color="white" fontWeight="bold">
          Confirm & Place Order
        </Text>
      </Button>
    </ScrollView>
  );
}

export default OrderConfirmScreen;
