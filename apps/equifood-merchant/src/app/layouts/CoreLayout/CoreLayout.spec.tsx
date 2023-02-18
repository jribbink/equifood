import { render } from '../../../test-utils/render';
import CoreLayout from './CoreLayout';

describe('Core Layout tests', () => {
  test('starts on home screen', async () => {
    const { getByTestId } = await render(<CoreLayout></CoreLayout>);
    expect(getByTestId('home-screen')).toBeVisible();
  });
});
