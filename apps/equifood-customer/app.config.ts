import { ExpoConfig } from './src/app/util/app-config';

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
