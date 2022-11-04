import '../app/bootstrap';
import '@testing-library/jest-native/extend-expect';
import { jest } from '@jest/globals';

// Mock app config (.env variables)
jest.mock('../app/app-config.ts', () => ({
  apiUrl: 'http://api-endpoint.com',
  skipAnimations: true,
}));
