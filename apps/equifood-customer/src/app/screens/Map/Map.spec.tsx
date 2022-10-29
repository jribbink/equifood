import * as React from 'react';
import { render } from '../../../test-utils/render';

import Map from './Map';

test('renders correctly', () => {
  const { getByTestId } = render(<Map />);
  expect(getByTestId('heading')).toHaveTextContent('Welcome');
});
