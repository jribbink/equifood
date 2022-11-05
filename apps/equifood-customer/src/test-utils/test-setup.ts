import '@testing-library/jest-native/extend-expect';
import { jest } from '@jest/globals';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock app config (.env variables)
jest.mock('../app/app-config.ts', () => ({
  apiUrl: 'http://api-endpoint.com',
  skipAnimations: true,
}));
