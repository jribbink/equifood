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
  onPress?: ((e: GestureResponderEvent) => void) | null;
}

const RestuarantCard = ({ item, onPress }: Props) => {
  return (
    <TouchableHighlight
      onPress={(e: any) => onPress?.(e)}
      testID="merchant-card"
      style={{ borderRadius: 5 }}
    >
      <Box borderRadius="5">
        <HStack
          bgColor="white"
          borderBottomRadius={5}
          shadow="5"
          p="1.5"
          space="2"
        >
          <Heading testID="item-name" fontSize="md" fontWeight="bold">
            {item.name}
          </Heading>
          <Text testID="new-price" fontSize="sm">
            {'Price: ' + item.newPrice}
          </Text>
          <Text
            testID="old-price"
            fontSize="xs"
            fontWeight="italic"
            style={{ textDecorationLine: 'line-through' }}
          >
            {'Old: ' + item.oldPrice}
          </Text>
        </HStack>
      </Box>
    </TouchableHighlight>
  );
};

export default RestuarantCard;
