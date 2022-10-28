import * as React from 'react';
import { render } from '@testing-library/react-native';

import App from './App';
import { jest } from '@jest/globals';
import Constants from 'expo-constants';

import axios from 'axios';

jest.mock('axios', () => ({
  defaults: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    set baseURL(url: string) {},
  },
}));

test('assigns correct API baseURL', () => {
  const baseUrlSpy = jest.spyOn(
    axios.defaults as { baseURL: string },
    'baseURL',
    'set'
  );

  render(<App />);

  expect(baseUrlSpy.mock.calls[0]).toEqual([Constants.expoConfig.extra.apiUrl]);
  jest.resetAllMocks();
});
