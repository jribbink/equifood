import Constants from 'expo-constants';
import { ExpoConfig as BaseExpoConfig } from '@expo/config-types';

export type AppConfig = {
  apiUrl: string;
  skipAnimations?: boolean;
};

export type ExpoConfig = Omit<BaseExpoConfig, 'extra'> & { extra: AppConfig };

const appConfig = Constants.expoConfig.extra;
export default appConfig;
