import { RestReponse } from '@equifood/api-interfaces';
import { AxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { RealtimeContext } from '../context/realtime-context';
import { useAuth } from './useAuth';
import { useAxios } from './useAxios';

export function useFetcher<T>(key: any) {
  const axios = useAxios();
  const { setJwt } = useAuth();
  const ctx = useContext(RealtimeContext);

  useEffect(() => {
    mutate(key, null, {
      revalidate: true,
    });
  }, [axios, key]);
  // Fetcher for SWR
  const fetcher = async (url: string) => {
    let res;
    try {
      res = await axios.get(url, {
        transformResponse: (data: string) => JSON.parse(data),
      });
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 401) {
        setJwt(null);
      } else {
        throw e;
      }
    }

    const data: RestReponse = res?.data;
    if (data?._subscriptions?.entity)
      ctx?.subscribe(
        data._subscriptions.entity,
        {},
        data?._subscriptions?.isArray
      );
    return data.data;
  };
  return useSWR<T>(key, fetcher);
}
