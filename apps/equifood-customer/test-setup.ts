import '@testing-library/jest-native/extend-expect';
import { jest } from '@jest/globals';
import Constants from 'expo-constants';
import axios from 'axios';
import appConfig from './src/app/app-config';

// Mock expo config (.env variables)
jest.doMock('expo-constants', () => {
  const actual = jest.requireActual('expo-constants') as typeof Constants;
  return {
    ...actual,
    expoConfig: {
      ...actual.expoConfig,
      extra: {
        ...actual.expoConfig?.extra,
        apiUrl: 'http://api-endpoint.com',
      },
    },
  };
});
axios.defaults.baseURL = appConfig.apiUrl;
