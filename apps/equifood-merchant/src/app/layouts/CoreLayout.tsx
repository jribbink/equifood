import { Merchant, Order, Item } from '@equifood/api-interfaces';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  createNavigationContainerRef,
  NavigationContainer,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen/AccountScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Orders from '../screens/Orders/Orders';

export type CoreNavigationParams = {
  home: undefined;
  account: undefined;
  orders: undefined;
};

const Tab = createBottomTabNavigator<CoreNavigationParams>();

export type CoreTabParams = {
  home: undefined;
  map: undefined;
  orders: undefined;
  account: undefined;
  orderConfirm: undefined;
};

export type CoreStackParams = {
  core: NavigatorScreenParams<CoreTabParams>;
  merchant: {
    merchant: Merchant;
  };
  order: {
    order: Order;
  };
  cart: undefined;
  orderConfirm: {
    merchant: Merchant;
    items: Item[];
    quantities: { [id: string]: number };
  };
};

function CoreLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomeScreen}></Tab.Screen>
      <Tab.Screen name="account" component={AccountScreen}></Tab.Screen>
      <Tab.Screen name="orders" component={Orders}></Tab.Screen>
    </Tab.Navigator>
  );
}

export type CoreNavigationProps<T extends keyof CoreTabParams> =
  CompositeScreenProps<
    BottomTabScreenProps<CoreTabParams, T>,
    StackScreenProps<CoreStackParams, 'core'>
  >;

export default CoreLayout;
