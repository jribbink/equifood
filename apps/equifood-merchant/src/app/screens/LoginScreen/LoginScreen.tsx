import React from 'react';

import { Box, HStack } from 'native-base';
import { Text, SafeAreaView } from 'react-native';
import { LoginView } from '@equifood/ui-shared';
import { equifoodTheme } from '@equifood/ui-shared';

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} testID="login-screen" paddingX="6">
        <HStack justifyContent="center" style={{ marginTop: 60 }}>
          <Text
            style={{ fontSize: 36, color: equifoodTheme.colors.primary[500] }}
          >
            Equi
          </Text>
          <Text
            style={{ fontSize: 36, color: equifoodTheme.colors.primary[800] }}
          >
            Food
          </Text>
          <Text
            style={{ fontSize: 36, color: equifoodTheme.colors.primary[500] }}
          >
            Merchant
          </Text>
        </HStack>
        <LoginView allowedRoles={['merchant']}></LoginView>
      </Box>
    </SafeAreaView>
  );
};

export default LoginScreen;
