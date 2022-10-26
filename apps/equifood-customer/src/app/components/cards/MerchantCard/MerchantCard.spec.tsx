import * as React from 'react';
import { render } from '@testing-library/react-native';

import MerchantCard from './MerchantCard';
import { Merchant } from '@equifood/api-interfaces';

test('renders name correctly', () => {
  const merchant: Merchant = {
    id: '1234',
    name: 'foo',
    banner_url: 'https://example.com/example.png',
  };
  const { getByTestId } = render(<MerchantCard merchant={merchant} />);
  expect(getByTestId('heading')).toHaveContent('Welcome');
});
