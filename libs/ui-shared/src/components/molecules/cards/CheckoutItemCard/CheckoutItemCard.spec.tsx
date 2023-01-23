import * as React from 'react';
import { render } from '../../../../test-utils/render';

import { CheckoutItemCard } from './CheckoutItemCard';
import { Item } from '@equifood/api-interfaces';

describe('CheckoutItemCard tests', () => {
  test('renders name correctly', async () => {
    const item: Item = {
      id: '1234',
      name: 'foo',
      originalPrice: 6.99,
      price: 5.99,
      description: 'bar',
      allergies: 'peanut butter',
      quantity: 2,
    };
    const { getByTestId } = await render(
      <CheckoutItemCard item={item} quantity={item.quantity} />
    );
    expect(getByTestId('item-name')).toHaveTextContent(item.name);
  });
});
