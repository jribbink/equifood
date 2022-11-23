import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, Text, ScrollView, VStack } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import React, { useState } from 'react';
import { useMerchant } from '../../hooks/useMerchant';
import ItemCard from '../../components/cards/ItemCard/ItemCard';
import {
  addItem,
  removeItem,
  setMerchant,
} from '../../redux/slices/cart-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

export interface MerchantScreenParams {
  merchant: Merchant;
}

function RestaurantScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'merchant'>) {
  const dispatch = useDispatch<AppDispatch>();
  const { merchant } = useMerchant(route.params.merchant.id);

  if (!merchant) return null;

  const { items } = merchant;

  return (
    <ScrollView testID="items" flex={1}>
      {
        // ItemCard is currently (nov 17/2022) mostly copied from MerchantCard
        // please fix
        (items || []).map((i) => (
          <Box key={i.id} shadow="2">
            <ItemCard
              item={i}
              onPress={() => {
                dispatch(addItem(i));
                // change cart merchant here
              }}
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
