import React, { useState } from 'react';

import { Box, VStack } from 'native-base';
import {
  Button,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { authenticate, setJWT } from '../../redux/slices/auth-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import authConfig, { AuthProviderConfig } from '../../config/auth/authConfig';
import { useAxios } from '../../hooks/useAxios';
import IconButton from '../../components/buttons/IconButton/IconButton';

const Login = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const axios = useAxios();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 50,
    },
  });

  async function loginWithProvider(provider: AuthProviderConfig) {
    const socialJwt = await provider.strategy({ axios });
    const { data: jwt } = await axios.post<string>(`/auth/social-jwt`, null, {
      headers: { Authorization: `Bearer ${socialJwt}` },
    });
    dispatch(setJWT(jwt));
  }

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
      <Box flex={1} testID="login-screen">
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
            borderRadius: 0,
            width: '20%',
            alignSelf: 'flex-end',
          }}
        >
          <Button
            title="Sign in"
            onPress={() => {
              dispatch(authenticate({ email, password }));
            }}
            color="yellowgreen"
            testID="loginButton"
          />
        </Box>
      </Box>

      <VStack flexDirection="column" p="3" space="3">
        {authConfig.providers.map((provider) => (
          <IconButton
            key={provider.type}
            onPress={() => loginWithProvider(provider)}
            icon="md-logo-google"
            title={`Continue with ${provider.type
              .charAt(0)
              ?.toUpperCase()}${provider.type.substring(1)}`}
            backgroundColor={provider.color}
            textColor={provider.textColor}
            padding="2"
            size={8}
            fontSize={18}
            imageSource={provider.logo}
            imageAlt={provider.type}
            shadow="lg"
            iconProps={{
              style: { fontWeight: '800', fontSize: 30 },
            }}
          ></IconButton>
        ))}
        <Box>
          <Text style={{ fontSize: 15 }}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={{ color: 'darkgreen' }}>Sign up</Text>
            </TouchableOpacity>
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Login;
