import { Box, Heading, HStack, Text, Button } from 'native-base';
import { Item } from '@equifood/api-interfaces';

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
          <Text testID="purchase-limit" fontSize="sm" fontWeight="italic">
            {'Please note that you may only purchase ' +
              MAX_PER_PURCHASE +
              ' of this item per order.'}
          </Text>
        </Box>
        <Box>
          <Button
            style={{ backgroundColor: 'cyan', borderRadius: 30 }}
            onPress={() => onQuantityChange(Math.max(quantity - 1, 0))}
          >
            -
          </Button>
        </Box>
        <Box>
          <Text>{quantity}</Text>
        </Box>
        <Box>
          <Button
            style={{ backgroundColor: 'cyan', borderRadius: 30 }}
            onPress={() =>
              onQuantityChange(
                Math.min(
                  quantity + 1,
                  Math.min(MAX_PER_PURCHASE, item.quantity)
                )
              )
            }
          >
            +
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default ItemCard;
