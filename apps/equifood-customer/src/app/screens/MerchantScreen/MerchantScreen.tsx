import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, Text, ScrollView, VStack } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import React, { useState } from 'react';
import { useMerchant } from '../../hooks/useMerchant';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';

export interface MerchantScreenParams {
  merchant: Merchant;
}

function RestaurantScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'merchant'>) {
  const { merchant } = useMerchant(route.params.merchant.id);
  //const { items } = merchant.items;
  // the above should work, but we get a Merchant from /libs/api-interfaces/src/lib/merchant.ts
  // rather than a merchant.entity from /equifood-api/src/app/merchant/entities/merchant-entity.ts
  // pushing what I have for the night and going to bed.
  // also fix ItemCard as it is just a copy of MerchantCard at the moment
  return (
    <ScrollView testID="merchants" flex={1}>
      {
        // fix this when you figure out how to get items working
        /*(items || []).map((i) => (
        <Box key={i.id} shadow="2">
          <MerchantCard
            merchant={i}
            onPress={() => {
              console.log('press');
            }} // temporary until I get smart and figure out how to add this to the cart
          ></MerchantCard>
        </Box>
          ))*/
      }
      <Box>
        <Text>
          {route.params.merchant.name + ': ' + route.params.merchant.inventory}
        </Text>
        <Button
          onPress={() => navigation.navigate('core', { screen: 'map' })}
        ></Button>
      </Box>
    </ScrollView>
  );
}

export default RestaurantScreen;
