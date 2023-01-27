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
          marginTop: 20,
          fontSize: 40,
          fontWeight: 'bold',
          color: 'darkgreen',
        }}
      >
        Sign In
      </Text>
      <Box flex={1}>
        <Text
          testID="login"
          style={{
            fontSize: 18,
            marginBottom: 20,
            marginTop: 5,
            color: 'forestgreen',
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
            width: '20%',
            alignSelf: 'flex-end',
          }}
        >
          <Button
            style={{
              borderRadius: 30,
              backgroundColor: 'yellowgreen',
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
