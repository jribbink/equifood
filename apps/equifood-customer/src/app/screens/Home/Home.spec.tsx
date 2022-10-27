import * as React from 'react';
import { render } from '../../../../test-utils/render';

import Home from './Home';

test('renders correctly', () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId('heading')).toHaveTextContent('Welcome');
});
