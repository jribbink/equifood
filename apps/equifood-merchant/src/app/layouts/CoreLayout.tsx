import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import AccountScreen from '../screens/AccountScreen/AccountScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

export type CoreNavigationParams = {
  home: undefined;
  account: undefined;
};

const Tab = createBottomTabNavigator<CoreNavigationParams>();

function CoreLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomeScreen}></Tab.Screen>
      <Tab.Screen name="account" component={AccountScreen}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default CoreLayout;
