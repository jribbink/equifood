import { Order } from '@equifood/api-interfaces';
import { useNavigation } from '@react-navigation/native';
import { Box, Text, Image, HStack, VStack } from 'native-base';
import { useState } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { CoreNavigationProps } from '../../../layouts/CoreLayout/CoreNavigatorParams';

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  const navigation =
    useNavigation<CoreNavigationProps<'orders'>['navigation']>();

  const colorMap: Map<Order['status'], string> = new Map<
    Order['status'],
    string
  >([
    ['completed', 'green'],
    ['pending', 'yellow'],
    ['cancelled', 'red'],
  ]);

  const [imageWidth, setImageWidth] = useState<number>(0);

  return (
    <TouchableHighlight
      style={{ borderRadius: 5 }}
      onPress={() => navigation.navigate('order', order)}
    >
      <HStack
        shadow="5"
        backgroundColor="white"
        borderRadius={5}
        p="2"
        space="3"
      >
        <Image
          source={{ uri: order.merchant.logo_url }}
          alt={order.merchant.name}
          borderRadius="full"
          height="full"
          onLayout={(event) => {
            setImageWidth(event.nativeEvent.layout.height);
          }}
          width={imageWidth}
        ></Image>
        <HStack py="2" justifyContent="space-between" flexGrow={1} pr="2">
          <VStack>
            <Text>{order.merchant.name}</Text>
            <Text>
              {order.order_date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })}
            </Text>
          </VStack>
          <VStack alignItems="flex-end">
            <Text
              textTransform="uppercase"
              style={{ color: colorMap.get(order.status) }}
            >
              {order.status}
            </Text>
            <Text>${order.total.toFixed(2)}</Text>
          </VStack>
        </HStack>
      </HStack>
    </TouchableHighlight>
  );
}

export default OrderCard;
