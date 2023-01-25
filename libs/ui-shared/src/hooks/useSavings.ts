import { useFetcher } from './useFetcher';

export function useSavings(userId = 'self') {
  const { data, error } = useFetcher<number>(`/users/${userId}/savings`);
  return {
    savings: data,
    isLoading: !error && !data,
    isError: error,
  };
}
