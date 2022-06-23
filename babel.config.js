module.exports = (api) => {
  api.cache(false);

  const presets = ['@babel/preset-typescript', '@babel/preset-env'];

  return {
    env: {
      test: {
        presets,
      },
    },
  };
};
