import '@testing-library/jest-native/extend-expect';
import { jest } from '@jest/globals';
import Constants from 'expo-constants';
import axios from 'axios';
import appConfig from './src/app/app-config';

// Mock app config (.env variables)
jest.mock('./src/app/app-config.ts', () => ({
  apiUrl: 'http://api-endpoint.com',
  skipAnimations: true,
}));
axios.defaults.baseURL = appConfig.apiUrl;
