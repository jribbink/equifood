import * as React from 'react';
import { render } from '../../../test-utils/render';

import LoginScreen from './LoginScreen';
import { fireEvent, act, waitFor } from '@testing-library/react-native';

import { afterAll, afterEach, beforeAll, expect } from '@jest/globals';
import { login_handlers } from '../../../test-utils/mocks/handlers';
import { setupServer } from 'msw/node';
import { useAuth } from '@equifood/ui-shared';

const server = setupServer(...login_handlers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

test('renders correctly', async () => {
  const { getByTestId } = await render(<LoginScreen />);
  expect(getByTestId('login')).toHaveTextContent('sign in');
});

test('logs in properly', async () => {
  let tokenVal: string | null;

  function Wrapper({ children }: any) {
    const { token } = useAuth();
    React.useEffect(() => {
      tokenVal = token;
    }, [token]);
    return children;
  }

  const { store, getByTestId } = await render(
    <Wrapper>
      <LoginScreen></LoginScreen>
    </Wrapper>
  );

  // input email
  act(() => {
    fireEvent.changeText(getByTestId('emailInput'), 'johndoe@teleworm.us');
  });

  // input password
  act(() => {
    fireEvent.changeText(getByTestId('pwInput'), 'password');
  });

  // login
  act(() => {
    fireEvent.press(getByTestId('loginButton'));
  });

  //delay
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  // test that redux has changed
  await waitFor(
    () =>
      expect(tokenVal).toEqual(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'
      ),
    { timeout: 1000 }
  );
});
