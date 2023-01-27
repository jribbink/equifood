import { AxiosError } from 'axios';
import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { useAuth } from './useAuth';
import { useAxios } from './useAxios';

export function useFetcher<T>(key: any) {
  const axios = useAxios();
  const { setJwt } = useAuth();

  useEffect(() => {
    mutate(key, null, {
      revalidate: true,
    });
  }, [axios, key]);
  // Fetcher for SWR
  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((res) => res.data)
      .catch((e: AxiosError) => {
        if (e.response?.status === 401) {
          setJwt(null);
        }
      });
  return useSWR<T>(key, fetcher);
}
