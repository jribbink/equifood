import React from 'react';
import { useDisclose, Box } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';
import { CoreNavigationProps } from '../../layouts/CoreLayout/CoreNavigatorParams';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { useState, useEffect } from 'react';
import { useMerchants } from '../../hooks/useMerchants';
import ActionSheet from '../../components/ActionSheet/ActionSheet';
import MerchantMap from '../../components/MerchantMap/MerchantMap';

const Map = ({ navigation }: CoreNavigationProps<'map'>) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const { merchants } = useMerchants();

  function onMerchantPress(merchant: Merchant) {
    navigation.navigate('merchant', { merchant });
  }
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null
  );

  function handleMerchantChange(merchant: Merchant | null) {
    setSelectedMerchant(merchant);
    if (merchant) onOpen();
    else onClose();
  }

  const [mode, setMode] = useState<String>();

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const colorScheme = event.matches ? 'dark' : 'light';
        setMode(colorScheme);
      });
  }, []);

  if (!userLocation) return null;

  return (
    <Box height="full">
      <MerchantMap
        merchants={merchants}
        darkMode={mode == 'dark'}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      ></MerchantMap>
      <Box
        justifyContent="flex-end"
        height="full"
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        pointerEvents="box-none"
      >
        <ActionSheet
          isOpen={isOpen}
          onClose={onClose}
          onHeightChange={(height) => setPaddingBottom(height)}
        >
          {selectedMerchant ? (
            <MerchantCard
              merchant={selectedMerchant}
              onPress={() => onMerchantPress(selectedMerchant)}
            />
          ) : null}
        </ActionSheet>
      </Box>
    </Box>
  );
};

export default Map;
