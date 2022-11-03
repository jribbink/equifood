import axios from 'axios';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigationContainerRef } from '@react-navigation/native';
import { useSelector, useStore } from 'react-redux';
import { RootState } from '../../redux/store';
import appConfig from '../../app-config';

import Login from '../../screens/Login/Login';
import CoreLayout from '../CoreLayout/CoreLayout';

const Stack = createStackNavigator();

const RootLayout = () => {
  useEffect(() => {
    axios.defaults.baseURL = appConfig.apiUrl;
  }, []);

  const store = useStore<RootState>();
  const jwt = useSelector<RootState, string>(() => store.getState().auth.jwt);

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    let target = '';
    if (jwt !== '') target = 'core';
    else target = 'login';

    console.log('HELLO JWT', jwt);

    if (navigationRef.getCurrentRoute()?.name !== target)
      navigationRef.navigate(target as never);
  }, [jwt, navigationRef]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          navigationKey="login"
          name="login"
          component={Login}
        ></Stack.Screen>
        <Stack.Screen
          navigationKey="core"
          name="core"
          component={CoreLayout}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootLayout;
