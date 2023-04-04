import { NavigationContainer } from '@react-navigation/native';
import { render } from '../../../test-utils/render';
import CoreLayout from './CoreLayout';

describe('Core Layout tests', () => {
  test('starts on home screen', async () => {
    const { getByTestId } = await render(
      <NavigationContainer>
        <CoreLayout></CoreLayout>
      </NavigationContainer>
    );
    expect(getByTestId('home-screen')).toBeVisible();
  });
});
