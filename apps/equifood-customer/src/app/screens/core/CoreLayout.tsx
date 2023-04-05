import { Item, Merchant, Order } from '@equifood/api-interfaces';
import { equifoodTheme } from '@equifood/ui-shared';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootNavigationProps } from '../RootLayout';
import MerchantScreen from './MerchantScreen/MerchantScreen';
import OrderConfirmScreen from './OrderConfirmScreen/OrderConfirmScreen';
import OrderScreen from './OrderScreen/OrderScreen';
import TabLayout, { TabNavigationParams } from './tabs/TabLayout';

export type CoreNavigationParams = {
  tabs: NavigatorScreenParams<TabNavigationParams>;
  merchant: {
    merchant: Merchant;
  };
  order: {
    order: Order;
  };
  orderConfirm: {
    merchant: Merchant;
    items: Item[];
    quantities: { [id: string]: number };
  };
};

export type CoreNavigationProps<T extends keyof CoreNavigationParams> =
  CompositeScreenProps<
    StackScreenProps<CoreNavigationParams, T>,
    RootNavigationProps<'core'>
  >;

const Stack = createStackNavigator<CoreNavigationParams>();

function CoreLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tabs"
        component={TabLayout}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="merchant"
        component={MerchantScreen}
        options={{
          headerBackTitleVisible: true,
          headerBackTitle: 'Back',
          headerTitle: '',
          headerStyle: {
            backgroundColor: equifoodTheme.colors.primary[900],
          },
          headerTintColor: '#ffffff',
          headerBackTitleStyle: { fontWeight: 'bold' },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="orderConfirm"
        component={OrderConfirmScreen}
      ></Stack.Screen>
      <Stack.Screen name="order" component={OrderScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default CoreLayout;
