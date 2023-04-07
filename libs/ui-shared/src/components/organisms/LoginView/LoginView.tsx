import { Box, Button, Text } from 'native-base';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useAuth } from '../../../hooks';
import { equifoodTheme } from '../../atoms';

interface LoginViewProps {
  allowedRoles: string[];
}

export function LoginView({ allowedRoles }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticate } = useAuth();

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
    <Box flex={1} style={{ padding: 30 }}>
      <Text
        style={{
          textAlign: 'center',
          padding: 20,
          marginLeft: -20,
          marginTop: 20,
          fontSize: 40,
          fontWeight: 'bold',
          color: equifoodTheme.colors.primary[800],
        }}
      >
        Sign In
      </Text>
      <Box flex={1}>
        <Text
          testID="login"
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginBottom: 20,
            marginTop: 5,
            color: equifoodTheme.colors.primary[800],
          }}
        >
          Please sign in to continue.
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          placeholder="Email"
          value={email}
          testID="emailInput"
          autoCapitalize="none"
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          testID="pwInput"
        />
        <Box
          style={{
            marginTop: 15,
            marginRight: 15,
            alignSelf: 'stretch',
          }}
        >
          <Button
            style={{
              alignSelf: 'stretch',
              borderRadius: 30,
              backgroundColor: equifoodTheme.colors.primary[500],
            }}
            onPress={() => {
              authenticate({ email, password });
            }}
            testID="loginButton"
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
