import { User } from '@equifood/api-interfaces';
import { useFetcher } from './useFetcher';

export function useProfile() {
  const { data, error } = useFetcher<User>(`/users/self/profile`);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
