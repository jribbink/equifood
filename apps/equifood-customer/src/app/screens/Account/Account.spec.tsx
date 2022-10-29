import * as React from 'react';
import { render } from '@testing-library/react-native';

import Account from './Account';

test('renders correctly', () => {
  const { getByTestId } = render(<Account />);
  expect(getByTestId('heading')).toHaveTextContent('Welcome');
});
