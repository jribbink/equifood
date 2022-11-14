import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home/Home';
import Map from '../../screens/Map/Map';
import Orders from '../../screens/Orders/Orders';
import Account from '../../screens/Account/Account';
import MerchantScreen from '../../screens/MerchantScreen/MerchantScreen';
import Cart from '../../screens/Cart/Cart';
import { Button, View, Text } from 'native-base';
import { CoreStackParams, CoreTabParams } from './CoreNavigatorParams';

const Tab = createBottomTabNavigator<CoreTabParams>();
const Stack = createStackNavigator<CoreStackParams>();

function CoreNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="map" component={Map} />
      <Tab.Screen name="orders" component={Orders} />
      <Tab.Screen name="account" component={Account} />
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
          ></Stack.Screen>
          <Stack.Screen name="Cart" component={Cart}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <Button onPress={() => navigation.navigate('Cart')}></Button>
    </View>
  );
}

export default CoreLayout;
