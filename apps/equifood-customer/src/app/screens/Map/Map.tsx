import React, { useEffect } from 'react';
import { useDisclose, Box } from 'native-base';
import { Merchant, Location } from '@equifood/api-interfaces';
import { CoreNavigationProps } from '../../layouts/CoreLayout/CoreNavigatorParams';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { useState } from 'react';
import { useMerchants } from '../../hooks/useMerchants';
import * as expoLocation from 'expo-location';
import ActionSheet from '../../components/ActionSheet/ActionSheet';
import MerchantMap from '../../components/MerchantMap/MerchantMap';

const Map = ({ navigation }: CoreNavigationProps<'map'>) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const { merchants } = useMerchants();

  const [userLocation, setUserLocation] = useState<Location>();

  useEffect(() => {
    (async () => {
      const { status } = await expoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        const out: Location = {
          address: '',
          latitude: 49.941,
          longitude: -119.386,
        };
        setUserLocation(out);
        return;
      }
      const location = await expoLocation.getCurrentPositionAsync({});
      const out: Location = {
        address: '',
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(out);
    })();
  }, []);

  function onMerchantPress(merchant: Merchant) {
    navigation.navigate('merchant', { merchant });
  }

  const [paddingBottom, setPaddingBottom] = useState(0);

  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null
  );

  function handleMerchantChange(merchant: Merchant | null) {
    setSelectedMerchant(merchant);
    if (merchant) onOpen();
    else onClose();
  }

  if (!userLocation) return null;

  return (
    <Box height="full">
      <MerchantMap
        merchants={merchants}
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
