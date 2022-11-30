import { Box, Heading, HStack, Text, Button } from 'native-base';
import { Item } from '@equifood/api-interfaces';
import NumericUpDown from '../../primitives/NumericUpDown/NumericUpDown';

interface Props {
  item: Item;
  quantity: number;
  onQuantityChange: (n: number) => void;
}

const MAX_PER_PURCHASE = 3; //placeholder, maybe let merchants define this eventually

const ItemCard = ({ item, quantity, onQuantityChange }: Props) => {
  return (
    <Box borderRadius="5">
      <HStack
        bgColor="white"
        borderBottomRadius={5}
        shadow="5"
        p="1.5"
        space="5"
      >
        <Box flexShrink={1}>
          <Heading testID="item-name" fontSize="md" fontWeight="bold">
            {item.name}
          </Heading>
          <Text testID="new-price" fontSize="sm">
            {'Price: ' + item.price}
          </Text>
          <Text
            testID="old-price"
            fontSize="xs"
            fontStyle="italic"
            style={{ textDecorationLine: 'line-through' }}
          >
            {'Old: ' + item.originalPrice}
          </Text>
          <Text testID="purchase-limit" fontSize="sm" fontStyle="italic">
            {'Please note that you may only purchase ' +
              MAX_PER_PURCHASE +
              ' of this item per order.'}
          </Text>
        </Box>
        <NumericUpDown
          value={quantity}
          onValueChange={onQuantityChange}
          maxValue={Math.min(MAX_PER_PURCHASE, item.quantity)}
          minValue={0}
        ></NumericUpDown>
      </HStack>
    </Box>
  );
};

export default ItemCard;
