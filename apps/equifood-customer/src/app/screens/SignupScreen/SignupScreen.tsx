import { VStack, HStack, Text, Box, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useAuth, useAxios } from '@equifood/ui-shared';

function SignupScreen({ navigation }) {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const { setJwt } = useAuth();

  const axios = useAxios();

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 50,
    },
  });

  return (
    <Box flex={1} testID="login-screen">
      <Box flex={1} style={{ padding: 30 }}>
        <Text
          style={{
            padding: 20,
            marginLeft: -20,
            marginTop: 20,
            fontSize: 40,
            fontWeight: 'bold',
            color: 'darkgreen',
          }}
        >
          Sign up
        </Text>
        <Text
          testID="login"
          style={{
            fontSize: 18,
            marginBottom: 20,
            marginTop: 5,
            color: 'forestgreen',
          }}
        >
          Please sign up to create an account.
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setFirst}
          placeholder="First Name"
          value={first}
          testID="fistInput"
          autoCapitalize="none"
          placeholderTextColor={'yellowgreen'}
        />
        <TextInput
          style={styles.input}
          onChangeText={setLast}
          placeholder="Last Name"
          value={last}
          testID="lastInput"
          autoCapitalize="none"
          placeholderTextColor={'yellowgreen'}
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          placeholder="Email"
          value={email}
          testID="emailInput"
          autoCapitalize="none"
          placeholderTextColor={'yellowgreen'}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          placeholder="Phone number"
          value={phone}
          testID="phoneInput"
          autoCapitalize="none"
          placeholderTextColor={'yellowgreen'}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          testID="pwInput"
          placeholderTextColor={'yellowgreen'}
        />
        <Box
          style={{
            marginTop: 15,
            marginRight: 15,
            alignSelf: 'flex-end',
          }}
        >
          <Button
            style={{
              borderRadius: 30,
              backgroundColor: 'yellowgreen',
            }}
            testID="signUpButton"
            onPress={async () => {
              const { data: jwt } = await axios.post('/auth/create', {
                first_name: first,
                last_name: last,
                email: email,
                phone: phone,
                password: password,
                roles: ['customer'],
              });
              setJwt(jwt);
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <VStack flexDirection="column" p="3" space="3">
        <Box>
          <HStack>
            <Text style={{ fontSize: 15 }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={{ color: 'darkgreen' }}>Login</Text>
            </TouchableOpacity>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}

export default SignupScreen;
