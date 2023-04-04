import { Merchant } from '@equifood/api-interfaces';
import Animated, { SharedValue } from 'react-native-reanimated';
import MapView, { Region, Marker } from 'react-native-maps';
import RestaurantIcon from '../../../../assets/restaurant-icon.png';
import RestaurantIconDark from '../../../../assets/restaurant-icon-dark.png';

const AMapView = Animated.createAnimatedComponent(MapView);

interface MerchantMapProps extends React.ComponentProps<typeof Animated.View> {
  merchants: Merchant[] | undefined;
  initialRegion: Region | undefined;
  mapViewProps?: React.ComponentProps<typeof AMapView>;
  onMerchantChange?: (merchant: Merchant | null) => void;
  onMerchantPress?: (merchant: Merchant) => void;
  darkMode: boolean;
  paddingBottom: SharedValue<number>;
}

export function MerchantMap({
  merchants,
  initialRegion,
  onMerchantChange,
  onMerchantPress,
  mapViewProps,
  darkMode,
  paddingBottom,
  ...props
}: MerchantMapProps) {
  return (
    <Animated.View {...props}>
      <AMapView
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
            tracksViewChanges={false}
          />
        ))}
      </AMapView>
    </Animated.View>
  );
}
