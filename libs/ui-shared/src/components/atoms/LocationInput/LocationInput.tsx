import { useDebounce } from '../../../hooks/useDebounce';
import { useEffect, useMemo, useState } from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import {
  geocodeAsync,
  reverseGeocodeAsync,
  requestForegroundPermissionsAsync,
  LocationGeocodedAddress,
} from 'expo-location';

export function LocationInput() {
  const [suggestedLocations, setSuggestedLocations] = useState<
    { address: LocationGeocodedAddress; latitude: number; longitude: number }[]
  >([]);
  const [text, setText] = useState('');
  const { debouncedValue, hasChanged } = useDebounce(text, 1000);
  useEffect(() => {
    if (!debouncedValue) return;
    requestForegroundPermissionsAsync().then(({ granted }) => {
      if (granted) {
        geocodeAsync(debouncedValue).then(async (locations) => {
          if (locations.length === 0) setSuggestedLocations([]);
          else {
            const geocodedLocations = [];
            for (const location of locations) {
              const rev = await reverseGeocodeAsync(location);
              if (!rev[0]) throw new Error();
              geocodedLocations.push({
                address: rev[0],
                latitude: location.latitude,
                longitude: location.longitude,
              });
            }
            setSuggestedLocations(geocodedLocations);
          }
        });
      }
    });
  }, [debouncedValue]);
  const suggestions = useMemo(() => {
    return suggestedLocations.map(
      ({ address }) =>
        `${address.streetNumber} ${address.street}, ${address.city}, ${address.region}, ${address.country} ${address.postalCode}`
    );
  }, [suggestedLocations]);

  return (
    <Autocomplete data={suggestions} onChangeText={setText}></Autocomplete>
  );
}
