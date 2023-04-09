import React from 'react';

import { Box, HStack, VStack, Text, Spacer } from 'native-base';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { LoginProviderList, LoginView } from '@equifood/ui-shared';
import { authConfig } from '@equifood/ui-shared';
import { equifoodTheme } from '@equifood/ui-shared';
import { AuthNavigationProps } from '../AuthLayout';
import { useProviderLogin } from '../../../hooks/useProviderLogin';

function LoginScreen({ navigation }: AuthNavigationProps<'login'>) {
  const { loginWithProvider } = useProviderLogin();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} testID="login-screen" paddingX="6">
        <HStack justifyContent="center" style={{ marginTop: 60 }}>
          <Text
            fontSize="6xl"
            color="primary.600"
            fontWeight="semibold"
            fontFamily="heading"
          >
            Equifood
          </Text>
        </HStack>
        <LoginView allowedRoles={['customer']}></LoginView>

        <Spacer></Spacer>

        <LoginProviderList
          providers={authConfig.providers}
          onPress={loginWithProvider}
        ></LoginProviderList>

        <Box style={{ padding: 30 }}>
          <HStack>
            <Text style={{ fontSize: 15 }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text
                style={{
                  color: equifoodTheme.colors.primary[600],
                  fontWeight: '700',
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </HStack>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

export default LoginScreen;
