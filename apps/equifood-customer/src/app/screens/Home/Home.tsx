import React, { useEffect, useState } from 'react';

import { VStack, ScrollView } from 'native-base';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { Merchant } from '@equifood/api-interfaces';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getMerchants } from '../../redux/slices/merchant-slice';
import { AppDispatch, RootState } from '../../redux/store';

const Home = () => {
  const store = useStore<RootState>();
  const dispatch = useDispatch<AppDispatch>();

  const merchants = useSelector<RootState, Merchant[]>(
    () => store.getState().merchants.merchants
  );

  useEffect(() => {
    dispatch(getMerchants());
  }, [dispatch]);

  return (
    <ScrollView data-testID="heading">
      <VStack space={3} paddingX={2}>
        {merchants.map((merchant) => (
          <MerchantCard
            data-foo="heading"
            merchant={merchant}
            key={merchant.id}
          ></MerchantCard>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default Home;
