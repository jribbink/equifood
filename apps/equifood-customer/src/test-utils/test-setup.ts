import '@testing-library/jest-native/extend-expect';
import { beforeAll, jest } from '@jest/globals';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock app config (.env variables)
jest.mock('../app/config/app-config', () => ({
  apiUrl: 'http://api-endpoint.com',
  skipAnimations: true,
}));

////////////////////////////////
//// REACT-NATIVE-REANIMATED ///
////////////////////////////////

(globalThis as any).window = {};
(globalThis as any).window = global;

// eslint-disable-next-line no-undef
beforeAll(() => {
  // eslint-disable-next-line no-undef
  (globalThis as any).__reanimatedWorkletInit = jest.fn();
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

// add into jest.config
(globalThis as any).ReanimatedDataMock = {
  now: () => 0,
};
