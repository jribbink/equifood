import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useSWR, { mutate } from 'swr';
import { setJWT } from '../redux/slices/auth-slice';
import { useAxios } from './useAxios';

export function useFetcher<T>(key: any) {
  const axios = useAxios();
  const dispatch = useDispatch();
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
          dispatch(setJWT(null));
        }
      });
  return useSWR<T>(key, fetcher);
}
