import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from '../screens/AccountScreen/AccountScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MenuScreen from '../screens/MenuScreen/MenuScreen';

export type CoreNavigationParams = {
  home: undefined;
  menu: undefined;
  account: undefined;
};

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
