import * as React from 'react';
import { render } from '../../../test-utils/render';
import DefaultLayout from './DefaultLayout';

describe('DefaultLayout tests', () => {
  test('renders name correctly', () => {
    const content = 'foo';
    const { queryByText } = render(<DefaultLayout>{content}</DefaultLayout>);
    expect(queryByText(content)).toBeTruthy();
  });
});
