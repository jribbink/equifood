import { Box, Text } from 'native-base';
import { ReactNode } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

interface Props {
  children?: ReactNode;
}

function RestaurantsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>List Restaurants here</Text>
    </SafeAreaView>
  );
}

function MapScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Implement a Google map api here</Text>
    </SafeAreaView>
  );
}

function OrdersScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>List order history here</Text>
    </SafeAreaView>
  );
}

function AccountsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>List account info and settings here</Text>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

function DefaultLayout({ children }: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1}>
        {children}
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
            <Tab.Screen name="Accounts" component={AccountsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Box>
    </SafeAreaView>
  );
}

export default DefaultLayout;