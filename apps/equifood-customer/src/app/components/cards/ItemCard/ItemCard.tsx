import {
  Box,
  Heading,
  HStack,
  Image,
  ITheme,
  Text,
  View,
  ZStack,
} from 'native-base';
import { Item } from '@equifood/api-interfaces';
import {
  GestureResponderEvent,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

// currently just a copy of MerchantCard.
// should be fixed.

interface Props {
  item: Item;
  quantity: number;
  onQuantityChange: (n: number) => void;
}

const ItemCard = ({ item, quantity, onQuantityChange }: Props) => {
  return (
    <Box borderRadius="5">
      <HStack
        bgColor="white"
        borderBottomRadius={5}
        shadow="5"
        p="1.5"
        space="2"
      >
        <Box>
          <Heading testID="item-name" fontSize="md" fontWeight="bold">
            {item.name}
          </Heading>
          <Text testID="new-price" fontSize="sm">
            {'Price: ' + item.price}
          </Text>
          <Text
            testID="old-price"
            fontSize="xs"
            fontWeight="italic"
            style={{ textDecorationLine: 'line-through' }}
          >
            {'Old: ' + item.originalPrice}
          </Text>
        </Box>
        <Box>
          <Text>-</Text>
        </Box>
        <Box>
          <Text>{quantity}</Text>
        </Box>
        <Box>
          <Text>+</Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default ItemCard;
