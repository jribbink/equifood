import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, Actionsheet, useDisclose} from 'native-base';
import { Dimensions } from 'react-native';
import { Merchant, Location} from '@equifood/api-interfaces';
import { CoreNavigationProps } from '../../layouts/CoreLayout/CoreNavigatorParams';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { useState } from 'react';
import { useMerchants } from '../../hooks/useMerchants';

const Map = ({ navigation }: CoreNavigationProps<'map'>) => {

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  const { merchants } = useMerchants();

  const [userLocation, setUserLocation]= useState<Location>({
    address: "1234 st",
    latitude: 49.941,
    longitude: -119.386,
  })

  const [selectedMerchant, setMerchant]= useState<Merchant> ({
    id: "null",
    name: "Name",
    banner_url: "test",
    logo_url: "test",
    description: "test",
    location:{
      address: "123",
      latitude: 0,
      longitude: 0,
    },
    phone_number: "",
    inventory: 0,
    price: null,
    deadline: null,
  });

  function onMerchantPress(merchant: Merchant) {
    navigation.navigate('merchant', { merchant });
  }

  function selectMerchant(merchant: Merchant) {
    setMerchant(merchant);
    onOpen();
  }

  return (
    <View>
      <MapView style={{
        height:Dimensions.get('window').height, 
        width:Dimensions.get('window').width
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
            coordinate={{latitude: merchant.location.latitude, longitude: merchant.location.longitude}}
            title={merchant.name}
            description={merchant.description}
            onPress={() => selectMerchant(merchant)}
          />
        ))}
      </MapView>
      {selectedMerchant.id!='null' && 
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
      }
    </View>
  );
};

export default Map;
