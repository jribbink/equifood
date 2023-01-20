import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/Login/Login';
import SignupScreen from '../../screens/SignupScreen/SignupScreen';

const Stack = createStackNavigator();

function AuthLayout() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={Login} name="login"></Stack.Screen>
        <Stack.Screen component={SignupScreen} name="signup"></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthLayout;
