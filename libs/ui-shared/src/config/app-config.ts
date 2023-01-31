import Constants from 'expo-constants';
import { ExpoConfig as BaseExpoConfig } from '@expo/config-types';

export type AppConfig = {
  apiUrl: string;
  skipAnimations?: boolean;
};

export type ExpoConfig = Omit<BaseExpoConfig, 'extra'> & { extra: AppConfig };

export const appConfig = Constants.expoConfig?.extra;
