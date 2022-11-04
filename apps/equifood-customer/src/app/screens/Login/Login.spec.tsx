import * as React from 'react';
import { render } from '../../../test-utils/render';

import Login from './Login';
import { fireEvent, act } from '@testing-library/react-native';

import { afterAll, afterEach, beforeAll, expect } from '@jest/globals';
import { login_handlers } from '../../../test-utils/mocks/handlers';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(...login_handlers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

test('renders correctly', () => {
  const { getByTestId } = render(<Login />);
  expect(getByTestId('login')).toHaveTextContent('Login');
});

test('logs in properly', () => {
  const { store, getByTestId } = render(<Login></Login>);

  // input email
  act(() => {
    fireEvent.changeText(getByTestId('emailInput'), 'johndoe@teleworm.us');
  });

  // input password
  act(() => {
    fireEvent.changeText(getByTestId('pwInput'), 'password');
  });

  // login
  act(() => {
    fireEvent.press(getByTestId('loginButton'));
  });
  // test that redux has changed
  expect(store.getState().auth.jwt).toBe('foo');
});
