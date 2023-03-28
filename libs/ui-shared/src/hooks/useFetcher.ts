import { AxiosError } from 'axios';
import { useContext, useEffect, useRef } from 'react';
import useSWR from 'swr';
import { RealtimeContext } from '../context/realtime-context';
import { parseJwt } from '../util';
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

  // Fetcher for SWR
  async function fetcher(url: string) {
    console.log('FETCH ' + url);
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
      const subscriptionKey = parseJwt(subscriptionToken).payload.key;

      if (!ctx?.swrCache.has(key)) {
        ctx?.swrCache.set(key, subscriptionKey);
        ctx?.subscribe(
          subscriptionToken,
          () => {
            console.log(key);
            swr.mutate(_data.current, { revalidate: true });
          },
          () => {
            ctx?.swrCache.delete(key);
            swr.mutate(_data.current, { revalidate: true });
          }
        );
      }
    }

    return res?.data;
  }

  return swr;
}
