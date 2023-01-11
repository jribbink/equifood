import { Merchant } from '@equifood/api-interfaces';
import { Box, Text } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import { Animated } from 'react-native';
import MapView, { Region, Marker, MapViewProps } from 'react-native-maps';
import RestaurantIcon from '../../../../assets/restaurant-icon.png';

interface MerchantMapProps extends React.ComponentProps<typeof Animated.View> {
  merchants: Merchant[] | undefined;
  initialRegion: Region | undefined;
  mapViewProps?: MapViewProps;
  onMerchantChange?: (merchant: Merchant | null) => void;
  onMerchantPress?: (merchant: Merchant) => void;
}

function MerchantMap({
  merchants,
  initialRegion,
  onMerchantChange,
  onMerchantPress,
  mapViewProps,
  ...props
}: MerchantMapProps) {
  return (
    <Animated.View {...props}>
      <MapView
        style={{
          height: '100%',
          width: '100%',
        }}
        initialRegion={initialRegion}
        onPress={() => {
          onMerchantChange?.(null);
        }}
        showsUserLocation
        {...mapViewProps}
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
            image={RestaurantIcon}
            onPress={(e) => {
              e.stopPropagation();
              onMerchantChange?.(merchant);
            }}
            onCalloutPress={() => onMerchantPress?.(merchant)}
          />
        ))}
      </MapView>
    </Animated.View>
  );
}

export default MerchantMap;
