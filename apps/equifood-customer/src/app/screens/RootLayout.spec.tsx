import { render } from '../../test-utils/render';
import { storage } from '@equifood/ui-shared';
import RootLayout from './RootLayout';
import { act } from '@testing-library/react-native';

describe('Root layout', () => {
  test('starts on Home screen', async () => {
    const { queryByTestId } = await render(<RootLayout></RootLayout>);

    expect(queryByTestId('core-layout')).toBeNull();
    expect(queryByTestId('login-screen')).toBeDefined();
  });

  test('navigates to Core screen when logged in', async () => {
    const { queryByTestId, auth } = await render(<RootLayout></RootLayout>);

    act(() => {
      auth.setJwt(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'
      );
    });

    expect(queryByTestId('core-layout')).toBeDefined();
  });

  test('navigates to Home screen when logged out', async () => {
    storage.set(
      'jwt',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'
    );
    const { queryByTestId, auth } = await render(<RootLayout></RootLayout>);

    act(() => {
      auth.setJwt(null);
    });
    expect(queryByTestId('core-layout')).toBeNull();
    expect(queryByTestId('login-screen')).toBeDefined();
  });
});
