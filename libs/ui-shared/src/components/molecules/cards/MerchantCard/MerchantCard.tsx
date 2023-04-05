import { Box, Heading, HStack, Image, Text } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import { GestureResponderEvent, TouchableHighlight } from 'react-native';
import { useLocation, useMerchant } from '../../../../hooks';
import { getDistanceFromLatLonInKm } from '../../../../util/distance-calculator';
interface Props {
  merchant: Merchant;
  onPress?: (e: GestureResponderEvent) => void;
}

export const MerchantCard = ({ merchant, onPress }: Props) => {
  const userLocation = useLocation();

  let distance = 0;
  if (userLocation) {
    distance = Math.round(
      getDistanceFromLatLonInKm(
        merchant.location.latitude,
        merchant.location.longitude,
        userLocation.latitude,
        userLocation.longitude
      )
    );
  }

  const items = useMerchant(merchant.id).merchant?.items;
  const numItems = items?.reduce((s, item) => s + item.quantity, 0);
  const price = items?.reduce(function (prev, curr) {
    return prev.price < curr.price ? prev : curr;
  }).price;

  return (
    <TouchableHighlight
      onPress={onPress}
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
          <HStack flex={1} justifyContent="flex-end" p="1.5">
            <Box flex={1} justifyContent="flex-end" p="1.5">
              <Box
                backgroundColor="primary.200"
                width="16"
                height="6"
                borderRadius="5"
                margin={'2'}
              >
                <Text fontSize="md" fontWeight="bold" margin="auto">
                  {numItems} left
                </Text>
              </Box>
              <Image
                source={{ uri: merchant.logo_url }}
                alt={merchant.name}
                backgroundColor="white"
                borderRadius="full"
                width="16"
                height="16"
              ></Image>
            </Box>
            <Box justifyContent="flex-end" paddingTop={'20'}>
              <Box
                backgroundColor="primary.600"
                width="16"
                height="7"
                margin="auto"
                borderRadius="5"
              >
                <Text fontSize="md" fontWeight="bold" margin="auto">
                  ${price?.toFixed(2)}
                </Text>
              </Box>
            </Box>
          </HStack>
        </Box>

        <HStack
          bgColor="primary.300"
          borderBottomRadius={5}
          shadow="5"
          p="1.5"
          space="2"
        >
          <Heading testID="merchant-name" fontSize="md" fontWeight="bold">
            {merchant.name}
          </Heading>
          <Text>{distance} km</Text>
        </HStack>
      </Box>
    </TouchableHighlight>
  );
};
