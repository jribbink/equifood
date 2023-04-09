import { Merchant } from '@equifood/api-interfaces';
import { useFetcher } from './useFetcher';
import { useDebounce } from './useDebounce';

export function useMerchants(searchQuery?: string) {
  const { debouncedValue, hasChanged } = useDebounce(searchQuery, 1000);
  const endpoint = debouncedValue
    ? `/merchants?q=${encodeURIComponent(debouncedValue)}`
    : '/merchants';
  const { data, error } = useFetcher<Merchant[]>(endpoint);

  return {
    merchants: data,
    isLoading: (!error && !data) || hasChanged,
    isError: error,
  };
}
