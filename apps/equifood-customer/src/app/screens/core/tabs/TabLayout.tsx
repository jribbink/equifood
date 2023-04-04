import { equifoodTheme } from '@equifood/ui-shared';
import { Ionicons } from '@expo/vector-icons';
import {
  BottomTabBar,
  BottomTabBarProps,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { Box } from 'native-base';
import { CoreNavigationProps } from '../CoreLayout';
import AccountScreen from './AccountScreen/AccountScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import OrdersListScreen from './OrdersListScreen/OrdersListScreen';

export type TabNavigationParams = {
  home: undefined;
  orders: undefined;
  account: undefined;
};

export type TabNavigationProps<T extends keyof TabNavigationParams> =
  CompositeScreenProps<
    BottomTabScreenProps<TabNavigationParams, T>,
    CoreNavigationProps<'tabs'>
  >;

const Tab = createBottomTabNavigator<TabNavigationParams>();

const TabBar = (props: BottomTabBarProps) => (
  <Box>
    <BottomTabBar {...props} />
  </Box>
);

function TabLayout() {
  return (
    <Tab.Navigator
      tabBar={TabBar}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'];

          if (route.name === 'account') {
            iconName = focused ? 'md-person' : 'md-person-outline';
          } else if (route.name === 'home') {
            iconName = focused ? 'md-restaurant' : 'ios-restaurant-outline';
          } else if (route.name === 'orders') {
            iconName = focused ? 'md-list' : 'md-list-outline';
          } else {
            return;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: equifoodTheme.colors.primary[900],
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{ title: 'Restaurants' }}
      />
      <Tab.Screen
        name="orders"
        component={OrdersListScreen}
        options={{ title: 'Orders' }}
      />
      <Tab.Screen
        name="account"
        component={AccountScreen}
        options={{ title: 'Account' }}
      />
    </Tab.Navigator>
  );
}

export default TabLayout;
