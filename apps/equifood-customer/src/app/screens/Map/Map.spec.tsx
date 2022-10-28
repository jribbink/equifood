import * as React from 'react';
import { render } from '@testing-library/react-native';

import Map from './Map';

test('renders correctly', () => {
  const { getByTestId } = render(<Map />);
  expect(getByTestId('heading')).toHaveTextContent('Welcome');
});
