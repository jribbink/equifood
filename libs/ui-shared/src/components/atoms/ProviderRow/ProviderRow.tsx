import { AuthProvider } from '@equifood/api-interfaces';
import { Box, Image, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { AuthProviderConfig } from '../../../config/auth/authConfig';
interface ProviderRowProps {
  provider?: AuthProvider;
  providerConfig: AuthProviderConfig;
  onPress?: () => void;
}

export function ProviderRow({
  providerConfig,
  provider,
  onPress,
}: ProviderRowProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" p="2" alignItems="center" justifyItems="center">
        <Image
          source={providerConfig.logo}
          alt={providerConfig.type}
          width="4"
          height="4"
          resizeMode="contain"
          mr="2"
        ></Image>
        <Text>
          {providerConfig.type.charAt(0).toUpperCase() +
            providerConfig.type.substring(1)}
        </Text>
        <Text ml="auto">{provider?.accountEmail || 'Not conected'}</Text>
      </Box>
    </TouchableOpacity>
  );
}
