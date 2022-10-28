import * as React from 'react';
import { render } from '@testing-library/react-native';

import Orders from './Orders';

test('renders correctly', () => {
  const { getByTestId } = render(<Orders />);
  expect(getByTestId('heading')).toHaveTextContent('Welcome');
});
