import {
  NavigationContainer,
  createNavigationContainerRef,
  NavigatorScreenParams,
  CompositeScreenProps,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { View } from 'native-base';
//import CartButton from '../../components/buttons/CartButton/CartButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import CoreLayout, { CoreNavigationParams } from './CoreLayout';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { useAuth } from '@equifood/ui-shared';

const Stack = createStackNavigator<RootNavigationParams>();

export type RootNavigationParams = {
  core: NavigatorScreenParams<CoreNavigationParams>;
  login: undefined;
};

export type RootNavigationProps<T extends keyof CoreNavigationParams> =
  CompositeScreenProps<
    BottomTabScreenProps<CoreNavigationParams, T>,
    StackScreenProps<RootNavigationParams, 'core'>
  >;

function RootLayout() {
  const navigation = createNavigationContainerRef<RootNavigationParams>();
  const { token } = useAuth();

  useEffect(() => {
    if (token) navigation.navigate('core', { screen: 'home' });
    else navigation.navigate('login');
  }, [token, navigation]);

  return (
    <View flex={1} testID="core-layout">
      <NavigationContainer ref={navigation}>
        <Stack.Navigator
          screenOptions={{ gestureEnabled: false, headerShown: false }}
        >
          <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
          <Stack.Screen name="core" component={CoreLayout}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default RootLayout;
