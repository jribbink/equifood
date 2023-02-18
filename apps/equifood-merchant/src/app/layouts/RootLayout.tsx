import {
  NavigationContainer,
  createNavigationContainerRef,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { View } from 'native-base';
import CoreLayout, { CoreNavigationParams } from './CoreLayout';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import ItemEditorScreen from '../screens/ItemEditorScreen/ItemEditorScreen';
import { useEffect } from 'react';
import { useAuth } from '@equifood/ui-shared';
import { Item } from '@equifood/api-interfaces';

const Stack = createStackNavigator<RootNavigationParams>();

export type RootNavigationParams = {
  core: NavigatorScreenParams<CoreNavigationParams>;
  itemEditor?: {
    item: Item | undefined;
  };
  login: undefined;
};

export type RootNavigationProps<T extends keyof RootNavigationParams> =
  StackScreenProps<RootNavigationParams, T>;

function RootLayout() {
  const navigation = createNavigationContainerRef<RootNavigationParams>();
  const { token } = useAuth();

  useEffect(() => {
    if (token) navigation.navigate('core', { screen: 'home' });
    else navigation.navigate('login');
  }, [token, navigation]);

  return (
    <View flex={1} testID="core-layout">
      <NavigationContainer ref={navigation}>
        <Stack.Navigator
          screenOptions={{ gestureEnabled: false, headerShown: false }}
        >
          <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
          <Stack.Screen name="core" component={CoreLayout}></Stack.Screen>
          <Stack.Screen
            name="itemEditor"
            component={ItemEditorScreen}
            options={{
              headerShown: true,
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default RootLayout;
