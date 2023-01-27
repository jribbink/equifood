import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StorageState {
  jwt: string;
}

type Callback = (error?: Error | null) => void;
type CallbackWithResult<T> = (error?: Error | null, result?: T | null) => void;

class AppStorage<T> {
  async get(key: keyof T, callback?: CallbackWithResult<object>) {
    const cb: CallbackWithResult<string> = (
      error?: Error | null,
      result?: string | null
    ) => {
      const res = result ? JSON.parse(result) : result;
      if (callback) callback(error, res);
    };
    return AsyncStorage.getItem(String(key), cb).then((r) =>
      r ? JSON.parse(r) : null
    );
  }

  async set(key: keyof T, value: object | null, callback?: Callback) {
    if (value)
      return AsyncStorage.setItem(String(key), JSON.stringify(value), callback);
    else return this.remove(key);
  }

  async remove(key: keyof T, callback?: Callback) {
    return AsyncStorage.removeItem(String(key), callback);
  }

  async merge(key: keyof T, value: object, callback?: Callback) {
    return AsyncStorage.mergeItem(String(key), JSON.stringify(value), callback);
  }

  async clear(callback?: Callback) {
    return AsyncStorage.clear(callback);
  }
}

export const storage = new AppStorage<StorageState>();
