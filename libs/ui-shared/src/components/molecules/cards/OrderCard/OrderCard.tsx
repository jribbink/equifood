import { Order, ORDER_STATUS } from '@equifood/api-interfaces';
import { Text, Image, HStack, VStack } from 'native-base';
import { useState, useEffect } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
interface OrderCardProps {
  order: Order;
  onPress: (order: Order) => void;
}

export function OrderCard({ order, onPress }: OrderCardProps) {
  const colorMap: Map<Order['status'], string> = new Map<
    Order['status'],
    string
  >([
    [ORDER_STATUS.completed, 'green'],
    [ORDER_STATUS.confirmed, 'yellow'],
    [ORDER_STATUS.pending, 'blue'],
    [ORDER_STATUS.cancelled, 'red'],
  ]);

  const [imageWidth, setImageWidth] = useState<number>(0);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const [seconds, setSeconds] = useState(900);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }, []);

  return (
    <TouchableHighlight
      style={{ borderRadius: 5 }}
      onPress={() => onPress(order)}
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
            <Text style={{ fontWeight: 'bold' }}>{order.merchant.name}</Text>
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
              style={{ color: colorMap.get(order.status), fontWeight: 'bold' }}
            >
              {formatTime(seconds)} {ORDER_STATUS[order.status]}
            </Text>
            <Text>${order.total.toFixed(2)}</Text>
          </VStack>
        </HStack>
      </HStack>
    </TouchableHighlight>
  );
}
