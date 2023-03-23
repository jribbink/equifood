import React from 'react';

import { Box, HStack, VStack } from 'native-base';
import { Text, TouchableOpacity } from 'react-native';
import { LoginView } from '@equifood/ui-shared';
import { equifoodTheme } from '@equifood/ui-shared';

const LoginScreen = ({ navigation }) => {
  return (
    <Box flex={1} testID="login-screen">
      <LoginView allowedRoles={['merchant']}></LoginView>
    </Box>
  );
};

export default LoginScreen;
