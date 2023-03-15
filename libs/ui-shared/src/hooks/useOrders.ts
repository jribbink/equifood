import { Order } from '@equifood/api-interfaces';
import { useFetcher } from './useFetcher';

export const SWR_KEY_ORDERS = (userId = 'self', isMerchant = false) =>
  `/${isMerchant ? 'merchants' : 'users'}/${userId}/orders`;

export function useOrders(userId = 'self', isMerchant = false) {
  const { data, error } = useFetcher<Order[]>(
    SWR_KEY_ORDERS(userId, isMerchant)
  );

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
}
