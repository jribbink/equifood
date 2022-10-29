import * as React from 'react';
import { render } from '@testing-library/react-native';

import Login from './Login';

test('renders correctly', () => {
  const { getByTestId } = render(<Login />);
  expect(getByTestId('login')).toHaveTextContent('Login');
});
