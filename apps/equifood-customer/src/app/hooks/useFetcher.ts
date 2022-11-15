import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { useAxios } from './useAxios';

export function useFetcher<T>(key: any) {
  const axios = useAxios();
  useEffect(() => {
    mutate(key, undefined, false);
  }, [axios, key]);
  // Fetcher for SWR
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  return useSWR<T>(key, fetcher);
}
