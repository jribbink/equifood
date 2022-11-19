import * as React from 'react';
import { render } from '../../../../test-utils/render';

import ItemCard from './ItemCard';
import { Item } from '@equifood/api-interfaces';

describe('MerchantCard tests', () => {
  test('renders name correctly', async () => {
    const item: Item = {
      id: '1234',
      name: 'foo',
      oldPrice: 6.99,
      newPrice: 5.99,
    };
    const { getByTestId } = await render(<ItemCard item={item} />);
    expect(getByTestId('item-name')).toHaveTextContent(item.name);
  });
});
