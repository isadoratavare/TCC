module.exports = ({ config }) => {
  return {
    ...config,
    android: {
      ...config.android,
      api_key: process.env.GOOGLE_MAPS_KEY
    },
  };
};
