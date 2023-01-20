import { Box, Heading, HStack, Text } from 'native-base';
import { Item } from '@equifood/api-interfaces';

interface Props {
  item: Item;
  quantity: number;
}

const CheckoutItemCard = ({ item, quantity }: Props) => {
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
        </Box>
        <Box>
          <Text>{quantity}</Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default CheckoutItemCard;
