import React, { useEffect } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, Actionsheet, useDisclose} from 'native-base';
import { Dimensions } from 'react-native';
import { Merchant, Location } from '@equifood/api-interfaces';
import { CoreNavigationProps } from '../../layouts/CoreLayout/CoreNavigatorParams';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { useState } from 'react';
import { useMerchants } from '../../hooks/useMerchants';
import * as expoLocation from 'expo-location';
import { PROVIDER_GOOGLE } from 'react-native-maps';

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

  const [selectedMerchant, setMerchant] = useState<Merchant>();

  function onMerchantPress(merchant: Merchant) {
    navigation.navigate('merchant', { merchant });
  }

  function selectMerchant(merchant: Merchant) {
    setMerchant(merchant);
    onOpen();
  }



  return (
    <View>
      {userLocation !=null &&
      <MapView
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
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
            image={{uri: 'https://imgur.com/L5PXC8v.png'}}
          />
        ))}
      </MapView>
      }
      {selectedMerchant != null && (
        <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay _backdrop>
          <Actionsheet.Content>
            <Actionsheet.Item>
              <MerchantCard
                merchant={selectedMerchant}
                onPress={() => onMerchantPress(selectedMerchant)}
              />
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      )}
    </View>
  );
};

export default Map;
