import appConfig from '../config/app-config';
import axios, { AxiosInstance } from 'axios';
import { useAuth } from './useAuth';
import { useEffect, useState } from 'react';
import { dateInterceptor } from '../util/date-interceptor';

export function useAxios() {
  const { token } = useAuth();
  const [instance, setInstance] = useState<AxiosInstance>(() => {
    const instance = axios.create({
      baseURL: appConfig.apiUrl,
      headers: {
        common: { Authorization: `Bearer ${token}` },
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
