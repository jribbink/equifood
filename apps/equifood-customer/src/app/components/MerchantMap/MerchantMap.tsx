import { Merchant } from '@equifood/api-interfaces';
import { Box } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import MapView, { Region, Marker, MapViewProps } from 'react-native-maps';
import RestaurantIcon from '../../../../assets/restaurant-icon.png';

interface MerchantMapProps extends InterfaceBoxProps {
  merchants: Merchant[] | undefined;
  initialRegion: Region | undefined;
  mapViewProps?: MapViewProps;
  onMerchantChange?: (merchant: Merchant | null) => void;
}

function MerchantMap({
  merchants,
  initialRegion,
  onMerchantChange,
  mapViewProps,
  ...props
}: MerchantMapProps) {
  return (
    <Box {...props}>
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
          />
        ))}
      </MapView>
    </Box>
  );
}

export default MerchantMap;
