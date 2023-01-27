import { Store } from '@reduxjs/toolkit';

export async function bootstrapApp(store: Store) {
  // Assign axios base URL
  /*axios.defaults.baseURL = appConfig.apiUrl;

  // skip animations if enabled
  if (appConfig.skipAnimations) {
    const original = Animated.timing;
    (Animated.timing as any) = (
      value: Animated.Value | Animated.ValueXY,
      config: Animated.TimingAnimationConfig
    ) => {
      return original(value, {
        ...config,
        duration: 0,
        delay: 0,
        useNativeDriver: false,
      });
    };
  }*/

  return { store };
}
