import { Box, Button, Text } from 'native-base';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useAuth } from '../../../hooks';
import { equifoodTheme } from '../../../config';

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
      marginTop: 12,
      marginBottom: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 50,
      maxWidth: 400,
    },
  });

  return (
    <Box>
      <Text
        testID="login"
        style={{
          textAlign: 'center',
          fontSize: 18,
          marginBottom: 20,
          marginTop: 5,
          color: equifoodTheme.colors.primary[600],
        }}
        fontWeight="bold"
        fontFamily="heading"
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
      <Button
        marginTop="4"
        borderRadius="full"
        backgroundColor="primary.600"
        _text={{
          fontSize: 'xl',
          fontWeight: 'bold',
          fontFamily: 'heading',
        }}
        onPress={() => {
          authenticate({ email, password });
        }}
        testID="loginButton"
        shadow="3"
      >
        Sign In
      </Button>
    </Box>
  );
}
