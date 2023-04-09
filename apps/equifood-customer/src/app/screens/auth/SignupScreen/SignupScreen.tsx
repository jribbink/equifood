import { VStack, HStack, Text, Box, Button, useTheme } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { useAuth, useAxios } from '@equifood/ui-shared';
import { equifoodTheme } from '@equifood/ui-shared';
import { AuthNavigationProps } from '../AuthLayout';

function SignupScreen({ navigation }: AuthNavigationProps<'signup'>) {
  const auth = useAuth();
  const theme = useTheme();

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [validEmail, setValidEmail] = useState(true);
  const [validFirst, setValidFirst] = useState(true);
  const [validLast, setValidLast] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const axios = useAxios();

  async function onSubmit() {
    let valid = true;
    let filteredPhone = '';
    if (phone != null) {
      filteredPhone = phone.split('-').join('');
    }
    if (/\S+@\S+\.\S+/.test(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
      valid = false;
    }
    if (first != null && first !== '') {
      setValidFirst(true);
    } else {
      setValidFirst(false);
      valid = false;
    }
    if (last != null && last !== '') {
      setValidLast(true);
    } else {
      setValidLast(false);
      valid = false;
    }
    if (filteredPhone != null && filteredPhone.length === 10) {
      setValidPhone(true);
    } else {
      console.log(filteredPhone.length + ' ' + phone.length);
      setValidPhone(false);
      valid = false;
    }
    if (password != null && password !== '') {
      setValidPassword(true);
    } else {
      setValidPassword(false);
      valid = false;
    }
    if (valid) {
      const { data: jwt } = await axios.post<string>('/auth/create', {
        first_name: first,
        last_name: last,
        email: email,
        phone: phone,
        password: password,
        roles: ['customer'],
      });
      auth.setJwt(jwt);
    }
  }

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 50,
    },
    error: {
      color: 'red',
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} testID="login-screen">
        <Box flex={1} style={{ padding: 30 }}>
          <Text
            fontSize="5xl"
            fontWeight="bold"
            fontFamily="heading"
            color="primary.600"
            pb="2"
          >
            Sign up
          </Text>
          <Text
            testID="login"
            fontSize="lg"
            color="primary.600"
            fontWeight="semibold"
            fontFamily="heading"
            pb="4"
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
          />
          {!validFirst && (
            <Text style={styles.error}>Please enter your First name</Text>
          )}
          <TextInput
            style={styles.input}
            onChangeText={setLast}
            placeholder="Last Name"
            value={last}
            testID="lastInput"
            autoCapitalize="none"
          />
          {!validLast && (
            <Text style={styles.error}>Please enter your Last name</Text>
          )}
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            placeholder="Email"
            value={email}
            testID="emailInput"
            autoCapitalize="none"
          />
          {!validEmail && (
            <Text style={styles.error}>Please enter a valid Email</Text>
          )}
          <TextInput
            style={styles.input}
            onChangeText={setPhone}
            placeholder="Phone number"
            value={phone}
            testID="phoneInput"
            autoCapitalize="none"
          />
          {!validPhone && (
            <Text style={styles.error}>Please enter a valid phone number</Text>
          )}
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            testID="pwInput"
          />
          {!validPassword && (
            <Text style={styles.error}>Please enter a password</Text>
          )}
          <Button
            mt="4"
            mx="3"
            borderRadius="full"
            backgroundColor="primary.600"
            testID="signUpButton"
            onPress={onSubmit}
            _text={{
              fontSize: 'xl',
              fontFamily: 'heading',
              fontWeight: 'bold',
            }}
            shadow="2"
          >
            Sign up
          </Button>
        </Box>
        <VStack flexDirection="column" p="3" space="3">
          <Box style={{ padding: 30 }}>
            <HStack>
              <Text style={{ fontSize: 15 }}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text color="primary.600" fontWeight="bold">
                  Login
                </Text>
              </TouchableOpacity>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}

export default SignupScreen;
