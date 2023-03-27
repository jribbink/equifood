import { Order } from '@equifood/api-interfaces';
import { useFetcher } from './useFetcher';

export function useOrder(orderId: string, isMerchant = false) {
  const { data, error } = useFetcher<Order>(`/orders/${orderId}`);

  return {
    order: data,
    isLoading: !error && !data,
    isError: error,
  };
}
