import * as React from 'react';
import { render } from '../../../../test-utils/render';

import MerchantCard from './MerchantCard';
import { Merchant } from '@equifood/api-interfaces';

describe('MerchantCard tests', () => {
  test('renders name correctly', () => {
    const merchant: Merchant = {
      id: '1234',
      name: 'foo',
      banner_url: 'https://example.com/example.png',
    };
    const { getByTestId } = render(<MerchantCard merchant={merchant} />);
    expect(getByTestId('merchant-name')).toHaveTextContent(merchant.name);
  });
});
