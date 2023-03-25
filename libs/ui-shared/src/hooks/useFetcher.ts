import { RealtimeUpdateMessage, RestReponse } from '@equifood/api-interfaces';
import { AxiosError } from 'axios';
import { useContext, useEffect, useRef } from 'react';
import useSWR, { mutate } from 'swr';
import { RealtimeContext } from '../context/realtime-context';
import { useAuth } from './useAuth';
import { useAxios } from './useAxios';
import _ from 'lodash';

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
    if (data?._subscriptions?.entity && realtime) {
      let entities = data.data;
      const isArray = data?._subscriptions?.isArray;
      if (!isArray) entities = [data.data];
      for (const entity of entities) {
        ctx?.subscribe(
          data._subscriptions.entity,
          data?._subscriptions?.pks.reduce((a, x) => {
            a[x] = entity[x];
            return a;
          }, {} as any),
          (msg: RealtimeUpdateMessage) => {
            if (msg.type === 'update') {
              if (isArray) {
                const newData = (_data.current as Array<any>).map((x) => {
                  const pk_match = data?._subscriptions?.pks.reduce(
                    (a, y) => a && x[y] === msg.data[y],
                    true
                  );

                  if (pk_match) return _.merge(x, msg.data);
                  else return x;
                });
                swr.mutate(newData as any);
              }
            }
          }
        );
      }
    }
    return data.data;
  }

  return swr;
}
