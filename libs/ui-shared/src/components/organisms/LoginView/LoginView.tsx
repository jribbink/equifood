import { AppDispatch } from '../../../redux/store';
import { Box, Button, Text } from 'native-base';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAuth } from 'libs/ui-shared/src/hooks';

interface LoginViewProps {
  allowedRoles: string[];
}

export function LoginView({ allowedRoles }: LoginViewProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticate } = useAuth();

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  return (
    <Box flex={1}>
      <Box flex={1} testID="login-screen">
        <Text testID="login" style={{ padding: 10, fontSize: 24 }}>
          Login
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          testID="emailInput"
          autoCapitalize="none"
        />
        <Text style={{ padding: 10, fontSize: 24 }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          testID="pwInput"
        />

        <Button
          onPress={() => {
            authenticate({ email, password });
          }}
          color="#841584"
          testID="loginButton"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
