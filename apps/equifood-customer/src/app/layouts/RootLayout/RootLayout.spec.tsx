import { render } from '../../../test-utils/render';
import { setupStore } from '../../redux/store';
import { logout, setJWT } from '../../redux/slices/auth-slice';
import RootLayout from './RootLayout';
import { act } from '@testing-library/react-native';

describe('Root layout', () => {
  test('starts on Home screen', async () => {
    const { queryByTestId } = await render(<RootLayout></RootLayout>);

    expect(queryByTestId('core-layout')).toBeNull();
    expect(queryByTestId('login-screen')).toBeDefined();
  });

  test('navigates to Core screen when logged in', async () => {
    const { queryByTestId, store } = await render(<RootLayout></RootLayout>);

    act(() => {
      store.dispatch(
        setJWT(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'
        )
      );
    });

    expect(queryByTestId('core-layout')).toBeDefined();
    expect(queryByTestId('login-screen')).toBeNull();
  });

  test('navigates to Home screen when logged out', async () => {
    const store = setupStore({
      auth: {
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U',
        status: 'idle',
      },
    });
    const { queryByTestId } = await render(<RootLayout></RootLayout>, {
      store,
    });

    act(() => {
      store.dispatch(logout());
    });
    expect(queryByTestId('core-layout')).toBeNull();
    expect(queryByTestId('login-screen')).toBeDefined();
  });
});
