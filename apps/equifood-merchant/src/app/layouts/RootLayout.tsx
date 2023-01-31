import {
  NavigationContainer,
  createNavigationContainerRef,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'native-base';
//import CartButton from '../../components/buttons/CartButton/CartButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import CoreLayout, { CoreNavigationParams } from './CoreLayout';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

const Stack = createStackNavigator<RootNavigationParams>();

export type RootNavigationParams = {
  core: NavigatorScreenParams<CoreNavigationParams>;
  login: undefined;
};

/*export type RootNavigationProps<T extends keyof RootNavigationParams> =
  CompositeScreenProps<
    BottomTabScreenProps<CoreTabParams, T>,
    StackScreenProps<CoreStackParams, 'core'>
  >;*/

function RootLayout() {
  const navigation = createNavigationContainerRef<RootNavigationParams>();

  return (
    <View flex={1} testID="core-layout">
      <NavigationContainer ref={navigation}>
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
          <Stack.Screen name="core" component={CoreLayout}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default RootLayout;
