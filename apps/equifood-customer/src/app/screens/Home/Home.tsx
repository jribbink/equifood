import React, { useEffect, useState } from 'react';
import { Box, ScrollView, VStack } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getMerchants } from '../../redux/slices/merchant-slice';
import { AppDispatch, RootState } from '../../redux/store';
import { CoreNavigationProps } from '../../layouts/CoreLayout/CoreNavigatorParams';
import ScrollingMenu, {
  MenuItem,
} from '../../components/menu/ScrollingMenu/ScrollingMenu';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';

const MerchantFilters: { [key: string]: MenuItem } = {
  burgers: {
    name: 'Burgers',
  },
  pizza: {
    name: 'Pizza',
  },
  chicken: {
    name: 'Chicken',
  },
};

const Home = ({ navigation }: CoreNavigationProps<'home'>) => {
  const store = useStore<RootState>();
  const dispatch = useDispatch<AppDispatch>();

  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);

  const merchants = useSelector<RootState, Merchant[]>(
    () => store.getState().merchants.merchants
  );

  useEffect(() => {
    dispatch(getMerchants());
  }, [dispatch]);

  function onChangeFilter(filter: keyof typeof MerchantFilters) {
    setSelectedItemKey(filter ? String(filter) : null);
  }

  function onMerchantPress(merchant: Merchant) {
    navigation.navigate('merchant', { merchant });
  }

  return (
    <ScrollView testID="home-screen" flex={1}>
      <ScrollingMenu
        items={MerchantFilters}
        selectedKey={selectedItemKey}
        onChange={onChangeFilter}
      ></ScrollingMenu>
      <VStack space="4" m="4">
        {merchants.map((m) => (
          <Box key={m.id} shadow="2">
            <MerchantCard
              merchant={m}
              onPress={() => onMerchantPress(m)}
            ></MerchantCard>
          </Box>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default Home;
