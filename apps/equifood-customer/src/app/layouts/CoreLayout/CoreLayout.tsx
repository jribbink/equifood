import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  BottomTabBar,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home/Home';
import Map from '../../screens/Map/Map';
import Orders from '../../screens/Orders/Orders';
import Account from '../../screens/Account/Account';
import MerchantScreen from '../../screens/MerchantScreen/MerchantScreen';
import OrderConfirm from '../../screens/OrderConfirm/OrderConfirm';
//import Cart from '../../screens/Cart/Cart';
import { Box, View } from 'native-base';
import { CoreStackParams, CoreTabParams } from './CoreNavigatorParams';
import OrderScreen from '../../screens/OrderScreen/OrderScreen';
//import CartButton from '../../components/buttons/CartButton/CartButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { equifoodTheme } from '@equifood/ui-shared';

const Tab = createBottomTabNavigator<CoreTabParams>();
const Stack = createStackNavigator<CoreStackParams>();

const TabBar = (props: BottomTabBarProps) => (
  <Box>
    <BottomTabBar {...props} />
  </Box>
);

function CoreNavigation() {
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
        component={Home}
        options={{ title: 'Restaurants' }}
      />
      <Tab.Screen
        name="orders"
        component={Orders}
        options={{ title: 'Orders' }}
      />
      <Tab.Screen
        name="account"
        component={Account}
        options={{ title: 'Account' }}
      />
    </Tab.Navigator>
  );
}
function CoreLayout() {
  const navigation = createNavigationContainerRef<CoreStackParams>();

  return (
    <View flex={1} testID="core-layout">
      <NavigationContainer ref={navigation}>
        <Stack.Navigator>
          <Stack.Screen
            name="core"
            component={CoreNavigation}
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
            component={OrderConfirm}
          ></Stack.Screen>
          {/*<Stack.Screen name="cart" component={Cart}></Stack.Screen>*/}
          <Stack.Screen name="order" component={OrderScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default CoreLayout;
