import React, { useEffect } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useDisclose, Text, Box } from 'native-base';
import { Merchant, Location } from '@equifood/api-interfaces';
import { CoreNavigationProps } from '../../layouts/CoreLayout/CoreNavigatorParams';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { useState } from 'react';
import { useMerchants } from '../../hooks/useMerchants';
import * as expoLocation from 'expo-location';
import ActionSheet from '../../components/ActionSheet/ActionSheet';

const Map = ({ navigation }: CoreNavigationProps<'map'>) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const { merchants } = useMerchants();

  const [userLocation, setUserLocation] = useState<Location>({
    address: '',
    latitude: 49.9,
    longitude: -119.5,
  });

  useEffect(() => {
    (async () => {
      const { status } = await expoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
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

  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null
  );

  function onMerchantPress(merchant: Merchant) {
    navigation.navigate('merchant', { merchant });
  }

  function selectMerchant(merchant: Merchant) {
    setSelectedMerchant(merchant);
    console.log('OK');
    onOpen();
  }

  return (
    <Box height="full">
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
            onPress={() => selectMerchant(merchant)}
          />
        ))}
      </MapView>
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
            <Text>Hello</Text>
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
