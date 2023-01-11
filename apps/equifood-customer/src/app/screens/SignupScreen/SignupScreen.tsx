import { VStack, Text, Box } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

function SignupScreen({ navigation }) {
  return (
    <VStack>
      <Text>Sign up</Text>
      <Box>
        <Text>
          Already have an account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text>Login</Text>
          </TouchableOpacity>
        </Text>
      </Box>
    </VStack>
  );
}

export default SignupScreen;
