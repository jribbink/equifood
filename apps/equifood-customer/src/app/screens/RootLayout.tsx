import React, { useEffect } from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigatorScreenParams,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useAuth } from '@equifood/ui-shared';
import CoreLayout, { CoreNavigationParams } from './core/CoreLayout';
import AuthLayout, { AuthNavigationParams } from './auth/AuthLayout';

const Stack = createStackNavigator<RootNavigationParams>();

export type RootNavigationParams = {
  core: NavigatorScreenParams<CoreNavigationParams>;
  auth: NavigatorScreenParams<AuthNavigationParams>;
};

export type RootNavigationProps<T extends keyof RootNavigationParams> =
  StackScreenProps<RootNavigationParams, T>;

const RootLayout = () => {
  const navigation = useNavigationContainerRef<RootNavigationParams>();
  const { token } = useAuth();
  useEffect(() => {
    if (!token) {
      navigation.navigate('auth', { screen: 'login' });
    } else {
      navigation.navigate('core', {
        screen: 'tabs',
        params: { screen: 'home' },
      });
    }
  }, [token, navigation]);

  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" component={AuthLayout}></Stack.Screen>
        <Stack.Screen name="core" component={CoreLayout}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootLayout;
