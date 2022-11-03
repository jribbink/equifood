import * as React from 'react';
import { render } from '../../../test-utils/render';

import Login from './Login';
/*
import { authenticate } from '../../redux/slices/auth-slice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { rest } from 'msw';
import { beforeAll } from '@jest/globals';
import { setupServer } from 'msw/node';*/
import { fireEvent } from '@testing-library/react-native';

test('renders correctly', () => {
  const { getByTestId } = render(<Login />);
  expect(getByTestId('login')).toHaveTextContent('Login');
});

test('logs in properly', () => {
  const { act, getByTestId } = render(<Login />);
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
});
