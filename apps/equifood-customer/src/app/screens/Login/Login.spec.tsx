import * as React from 'react';
import { render } from '../../../test-utils/render';

import Login from './Login';

test('renders correctly', () => {
  const { getByTestId } = render(<Login />);
  expect(getByTestId('login')).toHaveTextContent('Login');
});
