import * as React from 'react';
import { render } from '../../../test-utils/render';

import Home from './Home';

test('renders all merchant cards', () => {
  const merchants = [
    {
      id: 'foo1',
      name: 'bar',
      banner_url: 'https://example.com',
    },
    {
      id: 'foo2',
      name: 'bar',
      banner_url: 'https://example.com',
    },
  ];

  const { getAllByTestId } = render(<Home />, {
    preloadedState: {
      merchants: {
        merchants,
        status: 'idle',
      },
    },
  });

  const merchantCards = getAllByTestId('merchant-card');
  expect(merchantCards.length).toBe(merchants.length);
});
