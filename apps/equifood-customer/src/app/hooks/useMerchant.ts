import { Merchant } from '@equifood/api-interfaces';
import { useFetcher } from './useFetcher';

export function useMerchant(id: string) {
  const { data, error } = useFetcher<Merchant>(`/merchants/${id}`);

  return {
    merchant: data,
    isLoading: !error && !data,
    isError: error,
  };
}
