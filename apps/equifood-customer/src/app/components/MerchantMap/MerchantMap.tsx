import { Merchant } from '@equifood/api-interfaces';
import { Box } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import MapView, { Region, Marker } from 'react-native-maps';

interface MerchantMapProps extends InterfaceBoxProps {
  merchants: Merchant[] | undefined;
  initialRegion: Region | undefined;
  onMerchantChange?: (merchant: Merchant | null) => void;
}

function MerchantMap({
  merchants,
  initialRegion,
  onMerchantChange,
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
              onMerchantChange?.(merchant);
            }}
          />
        ))}
      </MapView>
    </Box>
  );
}

export default MerchantMap;
