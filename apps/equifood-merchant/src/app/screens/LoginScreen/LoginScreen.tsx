import React from 'react';

import { Box, HStack, VStack } from 'native-base';
import { Text, TouchableOpacity } from 'react-native';
import { LoginView } from '@equifood/ui-shared';
import { equifoodTheme } from '@equifood/ui-shared';

const LoginScreen = ({ navigation }) => {
  return (
    <Box flex={1} testID="login-screen">
      <Text style={{ fontSize: 36, color: equifoodTheme.colors.primary[500] }}>
        EquiFood Merchant
      </Text>
      <LoginView allowedRoles={['merchant']}></LoginView>
    </Box>
  );
};

export default LoginScreen;
