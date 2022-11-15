import { StackScreenProps } from '@react-navigation/stack';
import { Box } from 'native-base';
import { useEffect } from 'react';
import OrderView from '../../components/views/OrderView/OrderView';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';

function OrderScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'order'>) {
  const order = route.params.order;
  useEffect(() => {
    navigation.setOptions({ headerTitle: `Order #${order.id}` });
  }, [navigation, order]);
  return (
    <Box>
      <OrderView merchant={order.merchant} items={order.items}></OrderView>
    </Box>
  );
}

export default OrderScreen;
