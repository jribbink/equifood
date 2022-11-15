import { Order } from '@equifood/api-interfaces';
import { useFetcher } from './useFetcher';

export function useOrders(userId = 'self') {
  const { data, error } = useFetcher<Order[]>(`/users/${userId}/orders`);

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
}
