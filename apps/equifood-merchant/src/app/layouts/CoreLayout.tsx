import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen/AccountScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MenuScreen from '../screens/MenuScreen/MenuScreen';
import type { RootNavigationParams } from './RootLayout';

export type CoreNavigationParams = {
  home: undefined;
  menu: undefined;
  account: undefined;
};

export type CoreNavigationProps<T extends keyof CoreNavigationParams> =
  CompositeScreenProps<
    BottomTabScreenProps<CoreNavigationParams, T>,
    StackScreenProps<RootNavigationParams, 'core'>
  >;

const Tab = createBottomTabNavigator<CoreNavigationParams>();

function CoreLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomeScreen}></Tab.Screen>
      <Tab.Screen name="menu" component={MenuScreen}></Tab.Screen>
      <Tab.Screen name="account" component={AccountScreen}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default CoreLayout;
