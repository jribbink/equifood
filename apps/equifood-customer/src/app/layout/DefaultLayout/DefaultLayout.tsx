import { Box, Text } from 'native-base';
import { ReactNode } from 'react';
import { SafeAreaView } from 'react-native';

interface Props {
  children?: ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1}>
        {children}
        <Box bgColor="green.400">
          <Text>This is where navigation needs to go...</Text>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

export default DefaultLayout;
