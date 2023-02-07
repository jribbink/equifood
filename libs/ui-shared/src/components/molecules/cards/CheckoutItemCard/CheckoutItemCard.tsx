import { Box, Heading, HStack, Text } from 'native-base';
import { Item } from '@equifood/api-interfaces';

interface Props {
  item: Item;
  quantity: number;
}

export const CheckoutItemCard = ({ item, quantity }: Props) => {
  return (
    <Box borderRadius="5">
      <HStack
        bgColor="white"
        borderBottomRadius={5}
        shadow="5"
        p="1.5"
        space="5"
      >
        <HStack>
          <Box flexShrink={1}>
            <HStack>
              <Heading
                alignSelf="center"
                marginLeft="4"
                fontSize="20"
                fontWeight="bold"
              >
                {quantity}{' '}
              </Heading>
              <Heading
                alignSelf="center"
                testID="item-name"
                fontSize="20"
                fontWeight={'normal'}
              >
                x {item.name}
              </Heading>
              <Text
                alignSelf="center"
                marginLeft="3"
                testID="new-price"
                fontSize="20"
              >
                {'$ ' + item.price.toFixed(2)}
              </Text>
              <Text
                marginLeft="2"
                testID="old-price"
                fontSize="15"
                fontStyle="italic"
                color={'#ff0000'}
                style={{ textDecorationLine: 'line-through' }}
              >
                {'$ ' + item.originalPrice.toFixed(2)}
              </Text>
            </HStack>

            <HStack></HStack>
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};
