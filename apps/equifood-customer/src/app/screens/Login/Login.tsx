import React, { useState } from 'react';

import { Box, Image, ScrollView, VStack } from 'native-base';
import {
  Button,
  Text,
  SafeAreaView,
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
    <Box flex={1}>
      <Box flex={1} overflow="auto" testID="login-screen">
        <Text style={{ padding: 10, fontSize: 24 }}>Login</Text>
        <SafeAreaView>
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
        </SafeAreaView>

        <Button
          title="Login"
          onPress={() => {
            dispatch(authenticate({ email, password, strategy: 'local' }));
          }}
          color="#841584"
          testID="loginButton"
        />
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
            shadow="lg"
            iconProps={{
              style: { fontWeight: '800', fontSize: 30 },
            }}
          ></IconButton>
        ))}
      </VStack>

      <Box>
        <Text>
          Don't have an account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
