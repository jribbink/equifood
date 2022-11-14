import { Box, Heading, HStack, Image, Text, View, ZStack } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import {
  GestureResponderEvent,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

// currently just a copy of MerchantCard.
// should be fixed.

interface Props {
  merchant: Merchant;
  onPress?: ((e: GestureResponderEvent) => void) | null;
}

const RestuarantCard = ({ merchant, onPress }: Props) => {
  return (
    <TouchableHighlight
      onPress={(e: any) => onPress?.(e)}
      testID="merchant-card"
      style={{ borderRadius: 5 }}
    >
      <Box borderRadius="5">
        <Box h="32">
          <Image
            source={{
              uri: merchant.banner_url,
            }}
            alt={merchant.name}
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            borderTopRadius="5"
          />
          <Box flex={1} justifyContent="flex-end" p="1.5">
            <Image
              source={{ uri: merchant.logo_url }}
              alt={merchant.name}
              backgroundColor="white"
              borderRadius="full"
              width="16"
              height="16"
            ></Image>
          </Box>
        </Box>

        <HStack
          bgColor="white"
          borderBottomRadius={5}
          shadow="5"
          p="1.5"
          space="2"
        >
          <Heading testID="merchant-name" fontSize="md" fontWeight="bold">
            {merchant.name}
          </Heading>
        </HStack>
      </Box>
    </TouchableHighlight>
  );
};

export default RestuarantCard;
