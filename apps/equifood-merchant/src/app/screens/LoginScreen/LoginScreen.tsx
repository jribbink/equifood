import React from 'react';

import { Box, HStack, Text } from 'native-base';
import { SafeAreaView } from 'react-native';
import { LoginView } from '@equifood/ui-shared';
import { RootNavigationProps } from '../../layouts/RootLayout';

const LoginScreen = ({ navigation }: RootNavigationProps<'login'>) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} testID="login-screen" paddingX="6">
        <HStack justifyContent="center" style={{ marginTop: 60 }}>
          <Text fontSize="4xl" color="primary.600">
            Equifood Merchant
          </Text>
        </HStack>
        <LoginView allowedRoles={['merchant']}></LoginView>
      </Box>
    </SafeAreaView>
  );
};

export default LoginScreen;
