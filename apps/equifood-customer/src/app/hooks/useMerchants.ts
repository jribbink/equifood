import { Merchant } from '@equifood/api-interfaces';
import useSWR from 'swr';
import { fetcher } from '../util/fetcher';

export function useMerchants() {
  const { data, error } = useSWR<Merchant[]>('merchants', fetcher);

  return {
    merchants: data,
    isLoading: !error && !data,
    isError: error,
  };
}
