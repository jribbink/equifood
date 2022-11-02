import * as React from 'react';
import { render } from '../../../test-utils/render';

import Login from './Login';

import { authenticate } from '../../redux/slices/auth-slice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

test('renders correctly', () => {
  const { getByTestId } = render(<Login />);
  expect(getByTestId('login')).toHaveTextContent('Login');
});

test('connects to backend endpoint', () => {
  // I don't know how to test the backend connection itself because I'm a fool
  // but I'm going to test the dispatch(authenticate()) anyway

  const store = useStore<RootState>();
  const dispatch = useDispatch<AppDispatch>();

  const email = 'johndoe@teleworm.us';
  const pw = 'pass';
  dispatch(authenticate({ email, pw }));
});
