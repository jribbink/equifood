import { AuthProviderType } from '@equifood/api-interfaces';
import { AxiosInstance } from 'axios';
import appleStrategy from './providers/apple.strategy';
import facebookStrategy from './providers/facebook.strategy';
import googleStrategy from './providers/google.strategy';
import AppleLogo from '../../../assets/provider-logos/apple-logo.png';
import FacebookLogo from '../../../assets/provider-logos/facebook-logo.png';
import GoogleLogo from '../../../assets/provider-logos/google-logo.png';
import React from 'react';
import { Box, Text } from 'native-base';
import { ImageSourcePropType, Platform } from 'react-native';

export interface AuthProviderConfig {
  type: AuthProviderType;
  strategy: ({ axios }: { axios: AxiosInstance }) => Promise<any>;
  logo: ImageSourcePropType;
  color: React.ComponentProps<typeof Box>['backgroundColor'];
  textColor: React.ComponentProps<typeof Text>['color'];
}

export const authConfig = {
  providers: [
    {
      type: 'google',
      strategy: googleStrategy,
      logo: GoogleLogo,
      color: 'white',
      textColor: 'black',
    },
    {
      type: 'facebook',
      strategy: facebookStrategy,
      logo: FacebookLogo,
      color: 'white',
      textColor: 'black',
    },
    ...(Platform.OS === 'ios'
      ? [
          {
            type: 'apple',
            strategy: appleStrategy,
            logo: AppleLogo,
            color: 'white',
            textColor: 'black',
          },
        ]
      : []),
  ] as AuthProviderConfig[],
};
