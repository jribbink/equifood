import React, { useEffect } from 'react';
import { useDisclose, Box } from 'native-base';
import { Merchant, Location } from '@equifood/api-interfaces';
import { CoreNavigationProps } from '../../layouts/CoreLayout/CoreNavigatorParams';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { useState } from 'react';
import { useMerchants } from '../../hooks/useMerchants';
import * as expoLocation from 'expo-location';
import ActionSheet from '../../components/ActionSheet/ActionSheet';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

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

  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null
  );

  function handleMerchantChange(merchant: Merchant | null) {
    setSelectedMerchant(merchant);
    if (merchant) onOpen();
    else onClose();
  }

  return (
    <Box height="full">
      {userLocation != null && (
        <MapView
          style={{
            height: '100%',
            width: '100%',
          }}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={() => {
            onClose();
            setSelectedMerchant(null);
          }}
        >
          {(merchants || []).map((merchant) => (
            <Marker
              key={merchant.id}
              coordinate={{
                latitude: merchant.location.latitude,
                longitude: merchant.location.longitude,
              }}
              title={merchant.name}
              description={merchant.description}
              image={{ uri: 'https://imgur.com/L5PXC8v.png' }}
              onPress={(e) => {
                e.stopPropagation();
                handleMerchantChange(merchant);
              }}
            />
          ))}
        </MapView>
      )}
      {selectedMerchant !== null && (
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
          <ActionSheet isOpen={isOpen} onClose={onClose}>
            <MerchantCard
              merchant={selectedMerchant}
              onPress={() => onMerchantPress(selectedMerchant)}
            />
          </ActionSheet>
        </Box>
      )}
    </Box>
  );
};

export default Map;
