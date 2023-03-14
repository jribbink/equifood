import { Box, Heading, HStack, Text, VStack } from 'native-base';
import { Item } from '@equifood/api-interfaces';

interface Props {
  item: Item;
  quantity: number;
}

export const CheckoutItemCard = ({ item, quantity }: Props) => {
  return (
    <Box borderRadius="5">
      <HStack bgColor="white" borderBottomRadius={5} shadow="5" p="1.5">
        <Heading alignSelf="center" fontSize="20" fontWeight="bold" width="8">
          {`${quantity}x`}
        </Heading>
        <Heading
          alignSelf="center"
          testID="item-name"
          fontSize="20"
          fontWeight={'normal'}
        >
          {item.name}
        </Heading>
        <Text
          marginLeft="auto"
          testID="old-price"
          fontSize="15"
          fontStyle="italic"
          color={'primary.600'}
          style={{ textDecorationLine: 'line-through' }}
        >
          {'$ ' + item.originalPrice.toFixed(2)}
        </Text>
        <Text
          textAlign="right"
          marginLeft="3"
          marginRight="2"
          testID="new-price"
          fontSize="20"
          minWidth="20"
        >
          {'$ ' + item.price.toFixed(2)}
        </Text>
      </HStack>
    </Box>
  );
};
