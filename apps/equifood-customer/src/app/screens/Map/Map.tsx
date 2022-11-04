import React, { useRef, useState } from 'react';

import { VStack, ScrollView, Text } from 'native-base';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { Merchant } from '@equifood/api-interfaces';

const Map = () => {
  return (
    <ScrollView>
      {/* <VStack space={3} paddingX={2}>
        {merchants.map((merchant) => (
          <MerchantCard merchant={merchant} key={merchant.id}></MerchantCard>
        ))}
      </VStack> */}
      <Text testid="heading"> Google Map goes her</Text>
    </ScrollView>
  );
};

export default Map;
