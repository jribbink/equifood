import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, Text } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';

export interface MerchantScreenParams {
  merchant: Merchant;
}

function RestaurantScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'merchant'>) {
  return (
    <Box>
      <Text>{route.params.merchant.name}</Text>
      <Button
        onPress={() => navigation.navigate('core', { screen: 'map' })}
      ></Button>
    </Box>
  );
}

export default RestaurantScreen;
