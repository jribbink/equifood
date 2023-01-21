module.exports = (config) => {
  return {
    ...config,
    node: {
      __dirname: true,
    },
  };
};
