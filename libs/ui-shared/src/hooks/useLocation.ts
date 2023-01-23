import { useEffect, useState } from 'react';
import * as expoLocation from 'expo-location';
import { Location } from '@equifood/api-interfaces';

export function useLocation() {
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

  return userLocation;
}
