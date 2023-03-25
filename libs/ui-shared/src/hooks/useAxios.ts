import axios, { AxiosInstance } from 'axios';
import { useAuth } from './useAuth';
import { useContext, useEffect, useState } from 'react';
import { dateInterceptor } from '../util/date-interceptor';
import { EquifoodConfigContext } from '../context';
import { RestReponse } from '@equifood/api-interfaces';

export function useAxios() {
  const config = useContext(EquifoodConfigContext);
  const { token } = useAuth();
  const [instance, setInstance] = useState<AxiosInstance>(() => {
    const instance = axios.create({
      baseURL: config?.apiUrl,
      headers: {
        common: { Authorization: `Bearer ${token}` },
      },
      transformResponse: (data: string) => {
        return (JSON.parse(data) as RestReponse).data;
      },
    });
    instance.interceptors.response.use(dateInterceptor);
    return instance;
  });

  useEffect(() => {
    setInstance((instance: AxiosInstance) => {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return instance;
    });
  }, [token]);

  return instance;
}
