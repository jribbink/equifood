import React, { useRef, useState } from 'react';
import { Divider } from 'native-base';
import { VStack, ScrollView, Text } from 'native-base';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { Merchant } from '@equifood/api-interfaces';

const Orders = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([
    {
      id: '1',
      name: 'Test',
      address: '1234 st',
      banner_url: 'https://example.com/foo.png',
    },
    {
      id: '2',
      name: 'Test',
      address: '1234 st',
      banner_url: 'https://example.com/foo.png',
    },
    {
      id: '3',
      name: 'Test',
      address: '1234 st',
      banner_url: 'https://example.com/foo.png',
    },
  ]);

  return (
    <ScrollView>
      <Text
        style={{ fontWeight: 'bold', marginTop: 20, fontSize: 40, padding: 20 }}
      >
        Current Orders
      </Text>
      <Divider my={2} />
      <VStack space={3} paddingX={8}>
        {merchants.map((merchant) => (
          <MerchantCard merchant={merchant} key={merchant.id}></MerchantCard>
        ))}
      </VStack>
      <Divider my={2} />
      <Text
        style={{ fontWeight: 'bold', marginTop: 20, fontSize: 40, padding: 20 }}
      >
        Completed Orders
      </Text>
      <Divider my={2} />
      <Text style={{ marginTop: 10, fontSize: 20, padding: 10 }}>
        Restaurant Name + Time goes here
      </Text>

      <VStack space={3} paddingX={8}>
        {merchants.map((merchant) => (
          <MerchantCard merchant={merchant} key={merchant.id}></MerchantCard>
        ))}
      </VStack>
      <Divider my={2} />
      <Text style={{ marginTop: 10, fontSize: 20, padding: 10 }}>
        Restaurant Name + Time goes here
      </Text>
      <VStack space={3} paddingX={8}>
        {merchants.map((merchant) => (
          <MerchantCard merchant={merchant} key={merchant.id}></MerchantCard>
        ))}
      </VStack>
      <Divider my={2} />
      <Text style={{ marginTop: 10, fontSize: 20, padding: 10 }}>
        Restaurant Name + Time goes here
      </Text>
      <VStack space={3} paddingX={8}>
        {merchants.map((merchant) => (
          <MerchantCard merchant={merchant} key={merchant.id}></MerchantCard>
        ))}
      </VStack>
      <Divider my={2} />
      <Text style={{ marginTop: 10, fontSize: 20, padding: 10 }}>
        Restaurant Name + Time goes here
      </Text>
      <VStack space={3} paddingX={8}>
        {merchants.map((merchant) => (
          <MerchantCard merchant={merchant} key={merchant.id}></MerchantCard>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default Orders;
