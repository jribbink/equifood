import { Merchant } from '@equifood/api-interfaces';
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MapView, { Region, Marker } from 'react-native-maps';
import RestaurantIcon from '../../../../assets/restaurant-icon.png';
import RestaurantIconDark from '../../../../assets/restaurant-icon-dark.png';

interface MerchantMapProps extends React.ComponentProps<typeof Animated.View> {
  merchants: Merchant[] | undefined;
  initialRegion: Region | undefined;
  mapViewProps?: React.ComponentProps<typeof MapView>;
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
  const foobar = useSharedValue(0);
  useAnimatedReaction(
    () => paddingBottom.value,
    (d) => (foobar.value = d)
  );
  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'red',
        transform: [{ translateY: -foobar.value }],
      }}
      {...props}
    ></Animated.View>
  );
}
