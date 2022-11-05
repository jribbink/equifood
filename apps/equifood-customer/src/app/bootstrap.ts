import axios from 'axios';
import { Animated } from 'react-native';
import appConfig from './app-config';
import { setJWT } from './redux/slices/auth-slice';
import { setupStore } from './redux/store';
import storage from './storage';

export async function bootstrapApp(store = setupStore()) {
  // Assign axios base URL
  axios.defaults.baseURL = appConfig.apiUrl;

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
  }

  // bootstrap store
  store.dispatch(setJWT(await storage.get('jwt')));

  return { store };
}
