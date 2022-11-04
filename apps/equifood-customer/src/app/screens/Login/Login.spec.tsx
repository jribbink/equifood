import * as React from 'react';
import { render } from '../../../test-utils/render';

import Login from './Login';
import { fireEvent, act } from '@testing-library/react-native';

import { expect } from '@jest/globals';

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
