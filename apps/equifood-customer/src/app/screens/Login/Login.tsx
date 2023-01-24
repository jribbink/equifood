import React from 'react';

import { Box, VStack } from 'native-base';
import { Text, TouchableOpacity } from 'react-native';
import { LoginView, useAuth, useAxios } from '@equifood/ui-shared';
import { authConfig, AuthProviderConfig } from '@equifood/ui-shared';
import { IconButton } from '@equifood/ui-shared';

const Login = ({ navigation }) => {
  const axios = useAxios();
  const { setJwt } = useAuth();

  async function loginWithProvider(provider: AuthProviderConfig) {
    const socialJwt = await provider.strategy({ axios });
    const { data: jwt } = await axios.post<string>(`/auth/social-jwt`, null, {
      headers: { Authorization: `Bearer ${socialJwt}` },
    });
    setJwt(jwt);
  }

  return (
    <Box flex={1} testID="login-screen">
      <LoginView allowedRoles={['customer']}></LoginView>

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
