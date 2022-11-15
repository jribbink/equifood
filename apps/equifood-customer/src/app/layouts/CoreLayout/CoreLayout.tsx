import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home/Home';
import Map from '../../screens/Map/Map';
import Orders from '../../screens/Orders/Orders';
import Account from '../../screens/Account/Account';
import MerchantScreen from '../../screens/MerchantScreen/MerchantScreen';
import { View } from 'native-base';
import { CoreStackParams, CoreTabParams } from './CoreNavigatorParams';
import OrderScreen from '../../screens/OrderScreen/OrderScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator<CoreTabParams>();
const Stack = createStackNavigator<CoreStackParams>();

function CoreNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'];

          if (route.name === 'account') {
            iconName = focused ? 'md-person' : 'md-person-outline';
          } else if (route.name === 'home') {
            iconName = focused ? 'md-restaurant' : 'ios-restaurant-outline';
          } else if (route.name === 'map') {
            iconName = focused ? 'md-map' : 'md-map-outline';
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
        headerShown: false,
      })}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="map" component={Map} />
      <Tab.Screen name="orders" component={Orders} />
      <Tab.Screen name="account" component={Account} />
    </Tab.Navigator>
  );
}

function CoreLayout() {
  const navigation = useNavigationContainerRef();

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
          ></Stack.Screen>
          <Stack.Screen name="order" component={OrderScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default CoreLayout;
