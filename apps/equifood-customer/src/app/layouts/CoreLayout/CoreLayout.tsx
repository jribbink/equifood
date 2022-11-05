import { ReactNode } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import Map from '../../screens/Map/Map';
import Orders from '../../screens/Orders/Orders';
import Account from '../../screens/Account/Account';
import { View } from 'native-base';

const Tab = createBottomTabNavigator();

function CoreLayout() {
  return (
    <View flex={1} testID="core-layout">
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name="Restaurants" component={Home} />
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Orders" component={Orders} />
          <Tab.Screen name="Accounts" component={Account} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default CoreLayout;
