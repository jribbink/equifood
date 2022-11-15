import { StackScreenProps } from '@react-navigation/stack';
import { Box, Heading, Text } from 'native-base';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';

function OrderScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'order'>) {
  const order = route.params.order;
  return (
    <Box>
      <Heading>Order #{order.id}</Heading>
      {order.items.map(({ quantity, item }) => (
        <Text>
          {quantity}x {item.name}
        </Text>
      ))}
    </Box>
  );
}

export default OrderScreen;
