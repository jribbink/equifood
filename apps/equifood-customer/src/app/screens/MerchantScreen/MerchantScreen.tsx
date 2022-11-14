import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, Text, ScrollView, VStack } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import React, { useState } from 'react';
import { useMerchant } from '../../hooks/useMerchant';
import ItemCard from '../../components/cards/ItemCard/ItemCard';

export interface MerchantScreenParams {
  merchant: Merchant;
}

function RestaurantScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'merchant'>) {
  const { merchant } = useMerchant(route.params.merchant.id);
  const { items } = merchant.items;
  // why can this be undefined? fix later I guess

  return (
    <ScrollView testID="merchants" flex={1}>
      {
        // ItemCard is currently (nov 13/2022) a placeholder copied from MerchantScreen
        // please fix
        (items || []).map((i) => (
          <Box key={i.id} shadow="2">
            <ItemCard
              merchant={i}
              onPress={() => {
                console.log('press');
              }} // temporary until I get smart and figure out how to add this to the cart
            ></ItemCard>
          </Box>
        ))
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
