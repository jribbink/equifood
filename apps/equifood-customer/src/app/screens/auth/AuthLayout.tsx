import {
  CompositeScreenProps,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootNavigationProps } from '../RootLayout';
import LoginScreen from './LoginScreen/LoginScreen';
import SignupScreen from './SignupScreen/SignupScreen';

export type AuthNavigationParams = {
  login: undefined;
  signup: undefined;
};

export type AuthNavigationProps<T extends keyof AuthNavigationParams> =
  CompositeScreenProps<
    StackScreenProps<AuthNavigationParams, T>,
    RootNavigationProps<'auth'>
  >;

const Stack = createStackNavigator<AuthNavigationParams>();

function AuthLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={LoginScreen} name="login"></Stack.Screen>
      <Stack.Screen component={SignupScreen} name="signup"></Stack.Screen>
    </Stack.Navigator>
  );
}

export default AuthLayout;
