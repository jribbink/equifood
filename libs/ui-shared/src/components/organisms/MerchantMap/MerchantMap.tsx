import { Merchant } from '@equifood/api-interfaces';
import { Animated } from 'react-native';
import MapView, { Region, Marker, MapViewProps } from 'react-native-maps';
import RestaurantIcon from '../../../../assets/restaurant-icon.png';
import RestaurantIconDark from '../../../../assets/restaurant-icon-dark.png';

interface MerchantMapProps extends React.ComponentProps<typeof Animated.View> {
  merchants: Merchant[] | undefined;
  initialRegion: Region | undefined;
  mapViewProps?: MapViewProps;
  onMerchantChange?: (merchant: Merchant | null) => void;
  onMerchantPress?: (merchant: Merchant) => void;
  darkMode: boolean | undefined;
}

export function MerchantMap({
  merchants,
  initialRegion,
  onMerchantChange,
  onMerchantPress,
  mapViewProps,
  darkMode,
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
            image={darkMode ? RestaurantIconDark : RestaurantIcon}
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
