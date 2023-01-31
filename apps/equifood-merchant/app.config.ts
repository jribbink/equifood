import { ExpoConfig } from '@equifood/ui-shared';

import dotenv from 'dotenv';
dotenv.config();

export default ({ config }: { config: ExpoConfig }) => {
  return {
    ...config,
    extra: {
      apiUrl: process.env.API_URL,
      skipAnimations: process.env.SKIP_ANIMATIONS || false,
    },
  };
};
