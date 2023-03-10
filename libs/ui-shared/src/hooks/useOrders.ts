import { Order } from '@equifood/api-interfaces';
import { useFetcher } from './useFetcher';

export function useOrders(userId = 'self', isMerchant = false) {
  const { data, error } = useFetcher<Order[]>(
    `/${isMerchant ? 'merchants' : 'users'}/${userId}/orders`
  );

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
}
