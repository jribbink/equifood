import { ExpoConfig } from './src/app/app-config';

import dotenv from 'dotenv';
dotenv.config();

export default ({ config }: { config: ExpoConfig }) => {
  return {
    ...config,
    extra: {
      apiUrl: process.env.API_URL,
    },
  };
};
