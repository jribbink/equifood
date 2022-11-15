import { StackScreenProps } from '@react-navigation/stack';
import { Box, Heading, Text } from 'native-base';
import OrderView from '../../components/views/OrderView/OrderView';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';

function OrderScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'order'>) {
  const order = route.params.order;
  return (
    <Box>
      <Heading>Order #{order.id}</Heading>
      <OrderView merchant={order.merchant} items={order.items}></OrderView>
    </Box>
  );
}

export default OrderScreen;
