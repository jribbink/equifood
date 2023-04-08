import { AuthProviderConfig } from '../../../config';
import { VStack } from 'native-base';
import { IconButton } from '../../atoms';

export function LoginProviderList({
  providers,
  onPress,
}: {
  providers: AuthProviderConfig[];
  onPress: (provider: AuthProviderConfig) => void;
}) {
  return (
    <VStack flexDirection="column" space="3" maxW="400">
      {providers.map((provider) => (
        <IconButton
          key={provider.type}
          onPress={() => onPress(provider)}
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
          shadow="3"
          iconProps={{
            style: { fontWeight: '800', fontSize: 30 },
          }}
          _text={{
            fontFamily: 'heading',
          }}
        ></IconButton>
      ))}
    </VStack>
  );
}
