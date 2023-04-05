import '@testing-library/jest-native/extend-expect';
import { jest } from '@jest/globals';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockExpoLocation from './mock-expo-location';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock app config (.env variables)
jest.mock('../config/app-config', () => ({
  apiUrl: 'http://api-endpoint.com',
  skipAnimations: true,
}));

// Expo location
jest.mock('expo-location', () => mockExpoLocation);
