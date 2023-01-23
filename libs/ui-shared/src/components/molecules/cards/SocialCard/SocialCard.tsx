import { AuthProvider } from '@equifood/api-interfaces';
import { Box, Divider, Heading } from 'native-base';
import React from 'react';
import authConfig, {
  AuthProviderConfig,
} from '../../../../config/auth/authConfig';
import { useAxios } from '../../../../hooks/useAxios';
import { useProviders } from '../../../../hooks/useProviders';
import { ProviderRow } from '../../../atoms/ProviderRow/ProviderRow';

export function SocialCard() {
  const { providers, refresh } = useProviders();
  const axios = useAxios();

  async function handleRowPress(
    providerConfig: AuthProviderConfig,
    provider?: AuthProvider
  ) {
    if (provider) return;
    const socialJwt = await authConfig.providers
      .find((p) => p.type === providerConfig.type)
      ?.strategy({ axios });
    await axios.post('/auth/link', { socialJwt });
    refresh();
  }

  return (
    <Box p="3" backgroundColor="white" rounded="lg">
      <Heading pb="2">Social Connections</Heading>

      {authConfig.providers.map((providerConfig, i) => {
        const provider = providers?.find(
          (p: AuthProvider) => p.providerType === providerConfig.type
        );
        return (
          <React.Fragment key={providerConfig.type}>
            <ProviderRow
              onPress={() => handleRowPress(providerConfig, provider)}
              providerConfig={providerConfig}
              provider={provider}
            ></ProviderRow>
            {i !== authConfig.providers.length - 1 ? <Divider></Divider> : null}
          </React.Fragment>
        );
      })}
    </Box>
  );
}
