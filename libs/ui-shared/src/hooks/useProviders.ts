import { AuthProvider } from '@equifood/api-interfaces';
import { useFetcher } from './useFetcher';

export const GET_PROVIDERS = (userId = 'self') => `/users/${userId}/providers`;

export function useProviders(userId = 'self') {
  const {
    data,
    error,
    mutate: refresh,
  } = useFetcher<AuthProvider[]>(GET_PROVIDERS(userId));

  return {
    providers: data,
    isLoading: !error && !data,
    isError: error,
    refresh,
  };
}
