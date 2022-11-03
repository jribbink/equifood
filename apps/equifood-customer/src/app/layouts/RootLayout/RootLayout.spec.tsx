import { render } from '../../../test-utils/render';
import { setupStore } from '../../redux/store';
import { logout, setJWT } from '../../redux/slices/auth-slice';
import RootLayout from './RootLayout';
import { act } from '@testing-library/react-native';

describe('Root layout', () => {
  test('starts on Home screen', async () => {
    const { queryByTestId } = render(<RootLayout></RootLayout>);
    expect(await queryByTestId('login-screen')).toBeTruthy();
  });

  test('navigates to Core screen when logged in', async () => {
    const { queryByTestId, store } = render(<RootLayout></RootLayout>);

    act(() => {
      store.dispatch(setJWT('foobar'));
    });
    await expect(queryByTestId('core-layout')).toBeTruthy();
  });

  test('navigates to Home screen when logged out', async () => {
    const store = setupStore({
      auth: {
        jwt: 'foobar',
        status: 'idle',
      },
    });
    const { queryByTestId } = render(<RootLayout></RootLayout>, {
      store,
    });

    act(() => {
      store.dispatch(logout());
    });
    expect(queryByTestId('login-screen')).toBeTruthy();
  });
});
