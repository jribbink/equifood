import { User } from '@equifood/api-interfaces';
import { useFetcher } from './useFetcher';

const GET_PROFILE_KEY = (userId = 'self') => `/users/${userId}/`;

export function useProfile(userId = 'self') {
  const { data, error } = useFetcher<User>(GET_PROFILE_KEY(userId));

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
