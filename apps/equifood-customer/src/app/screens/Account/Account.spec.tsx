import * as React from 'react';
import { render } from '../../../test-utils/render';

import Account from './Account';

test('renders correctly', () => {
  const { getByTestId } = render(<Account />);
  expect(getByTestId('heading')).toHaveTextContent('Welcome');
});
