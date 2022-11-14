import { Merchant } from '@equifood/api-interfaces';
import useSWR from 'swr';
import { fetcher } from '../util/fetcher';

export function useMerchant(id: string) {
  const { data, error } = useSWR<Merchant>(`/merchants/${id}`, fetcher);

  return {
    merchant: data,
    isLoading: !error && !data,
    isError: error,
  };
}
