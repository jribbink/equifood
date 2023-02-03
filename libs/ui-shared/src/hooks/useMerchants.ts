import { Merchant } from '@equifood/api-interfaces';
import { useFetcher } from './useFetcher';
import useDebounce from './useDebounce';

export function useMerchants(searchQuery:string) {
  const debouncedSearch = useDebounce(searchQuery, 1000);
  var endpoint=`/merchants/${debouncedSearch}`;
  const { data, error } = useFetcher<Merchant[]>(endpoint);

  return {
    merchants: data,
    isLoading: !error && !data,
    isError: error,
  };
}
