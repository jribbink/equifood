declare module 'expo-constants' {
  type ExpoConfig = import('../app/config/app-config').ExpoConfig;
  let expoConfig: ExpoConfig;
}
