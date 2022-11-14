import * as React from 'react';
import { render } from '../../../../test-utils/render';

import ItemCard from './ItemCard';
import { Merchant } from '@equifood/api-interfaces';

describe('MerchantCard tests', () => {
  test('renders name correctly', async () => {
    const merchant: Merchant = {
      id: '1234',
      name: 'foo',
      banner_url: 'https://example.com/example.png',
    };
    const { getByTestId } = await render(<ItemCard merchant={merchant} />);
    expect(getByTestId('merchant-name')).toHaveTextContent(merchant.name);
  });
});
