import React, { useState } from 'react';
import { CoreNavigationProps } from '../../layouts/CoreLayout/CoreNavigatorParams';
import { Button, Box, HStack, VStack } from 'native-base';
import { Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  authenticate,
  setJWT,
  useAxios,
  authConfig,
  AuthProviderConfig,
} from '@equifood/ui-shared';
import { IconButton } from '@equifood/ui-shared';

const Login = ({ navigation }: { navigation: any }) => {
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
              dispatch(authenticate({ email, password }));
            }}
            testID="loginButton"
          >
            Sign In
          </Button>
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
          <HStack>
            <Text style={{ fontSize: 15 }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={{ color: 'darkgreen' }}>Sign up</Text>
            </TouchableOpacity>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Login;
