import React, { useRef, useState } from 'react';

import { VStack, ScrollView, Text } from 'native-base';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { Merchant } from '@equifood/api-interfaces';

const Account = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([
    {
      id: '1',
      name: 'Test',
      banner_url: 'https://example.com/foo.png',
    },
    {
      id: '2',
      name: 'Test',
      banner_url: 'https://example.com/foo.png',
    },
    {
      id: '3',
      name: 'Test',
      banner_url: 'https://example.com/foo.png',
    },
  ]);

  return (
    <ScrollView>
      <VStack space={3} paddingX={2}>
        {merchants.map((merchant) => (
          <MerchantCard merchant={merchant} key={merchant.id}></MerchantCard>
        ))}
      </VStack>
      <Text testid="heading"> Welcome </Text>
    </ScrollView>
  );
};

export default Account;
