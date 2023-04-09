export default {
  requestForegroundPermissionsAsync: () =>
    Promise.resolve({ status: 'granted' }),
  getCurrentPositionAsync: () =>
    Promise.resolve({
      coords: {
        latitude: 49.888,
        longitude: -119.496,
      },
    }),
};
