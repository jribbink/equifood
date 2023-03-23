import { Box, Heading, HStack, Text, Button } from 'native-base';
import { Item } from '@equifood/api-interfaces';
import { NumericUpDown } from '../../../atoms/NumericUpDown/NumericUpDown';

interface Props {
  item: Item;
  quantity?: number;
  onQuantityChange?: (n: number) => void;
}

const MAX_PER_PURCHASE = 3; //placeholder, maybe let merchants define this eventually

export const ItemCard = ({ item, quantity, onQuantityChange }: Props) => {
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
          <Heading testID="item-name" fontSize="20" fontWeight="bold">
            {item.name}
          </Heading>

          <HStack>
            <Text testID="new-price" fontSize="25">
              {'$ ' + item.price.toFixed(2)}
            </Text>
            <Text
              marginLeft="2"
              testID="old-price"
              fontSize="15"
              fontStyle="italic"
              color="primary.600"
              style={{ textDecorationLine: 'line-through' }}
            >
              {'$ ' + item.originalPrice.toFixed(2)}
            </Text>
          </HStack>

          <Text testID="purchase-limit" fontSize="sm" fontStyle="italic">
            {'Please note that you may only purchase ' +
              MAX_PER_PURCHASE +
              ' of this item per order.'}
          </Text>
        </Box>
        {quantity || quantity === 0 ? (
          <NumericUpDown
            value={quantity}
            onValueChange={onQuantityChange}
            maxValue={Math.min(MAX_PER_PURCHASE, item.quantity)}
            minValue={0}
          ></NumericUpDown>
        ) : null}
      </HStack>
    </Box>
  );
};
