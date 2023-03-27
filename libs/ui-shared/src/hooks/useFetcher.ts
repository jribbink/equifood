import { AxiosError } from 'axios';
import { useContext, useEffect, useRef } from 'react';
import useSWR, { mutate } from 'swr';
import { RealtimeContext } from '../context/realtime-context';
import { useAuth } from './useAuth';
import { useAxios } from './useAxios';

export function useFetcher<T>(key: any, realtime = true) {
  const axios = useAxios();
  const { setJwt } = useAuth();
  const ctx = useContext(RealtimeContext);
  const swr = useSWR<T>(key, fetcher);
  const _data = useRef<any>(null);
  useEffect(() => {
    _data.current = swr.data;
  }, [swr]);

  useEffect(() => {
    mutate(key, null, {
      revalidate: true,
    });
  }, [axios, key]);

  // Fetcher for SWR
  async function fetcher(url: string) {
    let res;
    try {
      res = await axios.get(url);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 401) {
        setJwt(null);
      } else {
        throw e;
      }
    }

    const subscriptionToken = res?.headers['x-subscription-token'];
    if (realtime && subscriptionToken) {
      ctx?.subscribe(subscriptionToken, () => {
        swr.mutate(_data.current, { revalidate: true });
      });
    }

    return res?.data;
  }

  return swr;
}
