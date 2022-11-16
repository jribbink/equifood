import { Merchant } from '@equifood/api-interfaces';
import { useFetcher } from './useFetcher';

export function useMerchants() {
  const { data, error } = useFetcher<Merchant[]>('merchants');

  return {
    merchants: data,
    isLoading: !error && !data,
    isError: error,
  };
}
