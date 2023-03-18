import React from 'react';

import { Box, HStack, VStack } from 'native-base';
import { Text, TouchableOpacity } from 'react-native';
import { LoginView } from '@equifood/ui-shared';
import { equifoodTheme } from '@equifood/ui-shared';

const LoginScreen = ({ navigation }) => {
  return (
    <Box flex={1} testID="login-screen">
      <LoginView allowedRoles={['merchant']}></LoginView>

      <VStack flexDirection="column" p="3" space="3">
        <Box style={{ padding: 30 }}>
          <HStack>
            <Text style={{ fontSize: 15 }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={{ color: equifoodTheme.colors.primary[500] }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default LoginScreen;
