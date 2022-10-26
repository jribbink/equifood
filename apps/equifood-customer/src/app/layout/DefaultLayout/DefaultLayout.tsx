import { Box, Text } from 'native-base';
import { ReactNode } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

interface Props {
  children?: ReactNode;
}

function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
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
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Box>
    </SafeAreaView>
  );
}

export default DefaultLayout;