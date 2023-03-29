import { Order } from '@equifood/api-interfaces';
import { useFetcher } from './useFetcher';

export function useOrder(orderId: string, isMerchant = false) {
  const { data, error, mutate } = useFetcher<Order>(`/orders/${orderId}`);

  return {
    order: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
}
