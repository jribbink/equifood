import { Box, Text } from 'native-base';
import { ReactNode } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import Map from '../../screens/Map/Map';
import Orders from '../../screens/Orders/Orders';
import Account from '../../screens/Account/Account';
import Cart from '../../screens/Cart/Cart';

interface Props {
  children?: ReactNode;
}

const Tab = createBottomTabNavigator();

function DefaultLayout({ children }: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="Accounts" component={Account} />
          </Tab.Navigator>
        </NavigationContainer>
      </Box>
    </SafeAreaView>
  );
}

export default DefaultLayout;
