import { Box, Heading, HStack, Text, VStack } from 'native-base';
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
          <Box width="100%">
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
            </HStack>
            <HStack alignSelf={'flex-end'}>
              <Text
                marginTop="-6"
                marginLeft="2"
                testID="old-price"
                fontSize="15"
                fontStyle="italic"
                color={'primary.600'}
                style={{ textDecorationLine: 'line-through' }}
              >
                {'$ ' + item.originalPrice.toFixed(2)}
              </Text>
              <Text
                marginTop="-7"
                marginLeft="3"
                marginRight="2"
                testID="new-price"
                fontSize="20"
              >
                {'$ ' + item.price.toFixed(2)}
              </Text>
            </HStack>
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};
