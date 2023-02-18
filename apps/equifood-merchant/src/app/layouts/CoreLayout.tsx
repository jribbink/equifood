import Ionicons from '@expo/vector-icons/Ionicons';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen/AccountScreen';
import MenuScreen from '../screens/MenuScreen/MenuScreen';
import OrderListScreen from '../screens/OrderListScreen/OrderListScreen';
import type { RootNavigationParams } from './RootLayout';

export type CoreNavigationParams = {
  orders: undefined;
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'];

          if (route.name === 'account') {
            iconName = focused ? 'md-person' : 'md-person-outline';
          } else if (route.name === 'menu') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'orders') {
            iconName = focused ? 'md-list' : 'md-list-outline';
          } else {
            return;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="menu" component={MenuScreen}></Tab.Screen>
      <Tab.Screen name="orders" component={OrderListScreen}></Tab.Screen>
      <Tab.Screen name="account" component={AccountScreen}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default CoreLayout;
