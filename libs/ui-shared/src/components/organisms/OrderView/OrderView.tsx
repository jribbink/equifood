import { Text, Box, Divider, HStack } from 'native-base';
import { Item, Merchant, Order } from '@equifood/api-interfaces';
import { CheckoutItemCard } from '../../molecules/cards/CheckoutItemCard/CheckoutItemCard';
import { FontAwesome } from '@expo/vector-icons';
import { MerchantMap } from '../MerchantMap/MerchantMap';

interface OrderViewProps {
  order: Order;
  viewHeight: number;
}

export function OrderView({ order, viewHeight }: OrderViewProps) {
  // computation goes here
  const subtotal = order.items.reduce(
    (acc, item) => acc + item.item.price * item.quantity,
    0
  );
  const originalSubtotal = order.items.reduce(
    (acc, item) => acc + item.item.originalPrice * item.quantity,
    0
  );

  return (
    <Box>
      <Box p="4">
        <Text fontSize="md" pb="2">
          Order Info
        </Text>
        <Box width="full" flexDirection="column">
          {order.items.map((item) => (
            <Box key={item.item.id}>
              <Box flexDirection="row" width="full" backgroundColor="red">
                <Text>{`${item.quantity}x ${item.item.name}`}</Text>
                <Text ml="auto" strikeThrough={true} color="red.600">
                  ${(item.item.originalPrice * item.quantity).toFixed(2)}
                </Text>
                <Text ml="2">
                  ${(item.item.price * item.quantity).toFixed(2)}
                </Text>
              </Box>
              {item.item.description ? (
                <Box pl="5">
                  <Text lineBreakMode="tail">{item.item.description}</Text>
                </Box>
              ) : null}
            </Box>
          ))}
        </Box>
      </Box>

      <Divider></Divider>
      <Box p="4">
        <Box flexDirection="row">
          <Text color="red.600">Your savings</Text>
          <Text color="red.600" ml="auto">
            - ${(originalSubtotal - subtotal).toFixed(2)}
          </Text>
        </Box>
        <Box flexDirection="row">
          <Text>Subtotal</Text>
          <Text ml="auto">${subtotal.toFixed(2)}</Text>
        </Box>
        <Box flexDirection="row">
          <Text>GST</Text>
          <Text ml="auto">${(subtotal * 0.05).toFixed(2)}</Text>
        </Box>
        <Box flexDirection="row">
          <Text>Total</Text>
          <Text ml="auto">${(subtotal * 1.05).toFixed(2)}</Text>
        </Box>
      </Box>
      <Divider></Divider>
      <Box p="4">
        <Box>
          <Text fontSize="md" pb="2">
            Pickup Instructions
          </Text>
          <Text>
            Please pickup at {order.merchant.location.address} before{' '}
            {order.deadline.toLocaleDateString(undefined, {
              hour: 'numeric',
              minute: '2-digit',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
          <Text pb="4">Payment: In-person</Text>
          {viewHeight ? (
            <MerchantMap
              darkMode={false}
              merchants={[order.merchant]}
              initialRegion={{
                longitude: order.merchant.location.longitude,
                latitude: order.merchant.location.latitude,
                latitudeDelta: 2,
                longitudeDelta: 2,
              }}
              style={{ width: '100%', height: viewHeight * 0.5 }}
            ></MerchantMap>
          ) : null}
        </Box>
      </Box>
      <Divider></Divider>
      <Box p="4">
        <Text>{`Placed ${order.order_date.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          minute: '2-digit',
          hour: 'numeric',
          timeZoneName: 'short',
        })}`}</Text>
      </Box>
      <HStack p="5" flexDirection="row" alignItems="center" space="3">
        <FontAwesome
          name="recycle"
          color="green"
          style={{
            fontSize: 50,
          }}
        ></FontAwesome>
        <Text
          flexShrink={1}
          fontSize="sm"
          lineBreakMode="head"
          textBreakStrategy="highQuality"
        >
          Congratulations, you saved ${(originalSubtotal - subtotal).toFixed(2)}{' '}
          today. Thank you for your contribution to reducing food waste across
          Canada.
        </Text>
      </HStack>
    </Box>
  );
}
