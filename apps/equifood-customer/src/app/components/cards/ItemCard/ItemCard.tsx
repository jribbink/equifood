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
        <Box h="32">
          {/*<Image                                   // food images probably not necessary?
            source={{                                 // worth considering as future feature
              uri: merchant.banner_url,
            }}
            alt={merchant.name}
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            borderTopRadius="5"
          ></Image>*/}
          <Box flex={1} justifyContent="flex-end" p="1.5">
            {/*<Image
              source={{ uri: merchant.logo_url }}     //
              alt={merchant.name}
              backgroundColor="white"
              borderRadius="full"
              width="16"
              height="16"
          ></Image>*/}
          </Box>
        </Box>

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
            {item.newPrice}
          </Text>
          <Text testID="old-price" fontSize="xs" fontWeight="italic">
            Old: {item.oldPrice}
          </Text>
        </HStack>
      </Box>
    </TouchableHighlight>
  );
};

export default RestuarantCard;
