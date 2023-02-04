import { Box, Heading, HStack, Image, Text } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import { GestureResponderEvent, TouchableHighlight } from 'react-native';
import { useLocation } from 'libs/ui-shared/src/hooks';

interface Props {
  merchant: Merchant;
  onPress?: (e: GestureResponderEvent) => void;
}

export const MerchantCard = ({ merchant, onPress }: Props) => {

  function getDistanceFromLatLonInKm(lat1:number, lon1:number, lat2:number, lon2:number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg :number) {
    return deg * (Math.PI/180)
  }

  const userLocation=useLocation();

  var distance=0;
  if(userLocation){
    distance=Math.round(getDistanceFromLatLonInKm(merchant.location.latitude, merchant.location.longitude, userLocation.latitude, userLocation.longitude));
  }

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
          <Text>{distance} km</Text>
        </HStack>
      </Box>
    </TouchableHighlight>
  );
};
