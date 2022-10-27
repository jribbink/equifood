export default () => {
  // Mock .env
  const env = {
    API_URL: 'http://api-url.com',
  };
  globalThis.process.env = {
    ...globalThis.process.env,
    ...env,
  };
};
