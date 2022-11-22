import { StackScreenProps } from '@react-navigation/stack';
import { Box, Heading, Image, ZStack } from 'native-base';
import { useEffect } from 'react';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
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
    <Box height="full" backgroundColor="white">
      <ZStack height={175}>
        <Image
          source={{ uri: order.merchant.banner_url }}
          alt={order.merchant.name}
          width="full"
          height="full"
        ></Image>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0.5" stopColor={'#000000'} stopOpacity={0.3} />
              <Stop offset="1" stopColor={'#000000'} stopOpacity={0.8} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </ZStack>

      <Svg height="100%" width="100%">
        <Rect x={80} y={50} width="40" height="5" fill="lightgrey"></Rect>
        <Circle cx="50" cy="50" r="25" fill="green" />
        <Circle
          cx="150"
          cy="50"
          r="25"
          stroke="lightgrey"
          strokeWidth="2"
          fill="white"
          fillOpacity={0.5}
        />
        <SvgText
          fill="white"
          stroke="none"
          fontSize="20"
          fontWeight="bold"
          x="50"
          y="55"
          textAnchor="middle"
        >
          1
        </SvgText>
        <SvgText
          fill="none"
          stroke="purple"
          fontSize="20"
          fontWeight="bold"
          x="100"
          y="20"
          textAnchor="middle"
        >
          STROKED TEXT
        </SvgText>
      </Svg>

      <Box>
        <Heading>Order #{String(order.id).padStart(6, '0')}</Heading>
      </Box>

      {/*<OrderView
        merchant={order.merchant}
        item={order.item.item}
        quantity={order.item.quantity}
  ></OrderView>*/}
    </Box>
  );
}

export default OrderScreen;
