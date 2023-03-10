import * as React from 'react';
import { render } from '../../../../test-utils/render';

import { ItemCard } from './ItemCard';
import { Item } from '@equifood/api-interfaces';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

describe('MerchantCard tests', () => {
  test('renders name correctly', async () => {
    const item: Item = {
      id: '1234',
      name: 'foo',
      originalPrice: 6.99,
      price: 5.99,
      description: 'Item description',
      allergies: '',
      quantity: 1,
    };
    const { getByTestId } = await render(
      <ItemCard item={item} quantity={2} onQuantityChange={noop} />
    );
    expect(getByTestId('item-name')).toHaveTextContent(item.name);
  });
});
