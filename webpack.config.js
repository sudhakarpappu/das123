const path = require('path');

module.exports = {
  // Your existing configuration
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      https: require.resolve('https-browserify'),
      http: require.resolve('http-browserify'),
      os: require.resolve('os-browserify/browser'),
      domain: require.resolve('domain-browser'),
      timers: require.resolve('timers-browserify'),
    },
  },
  // Other configurations...
};
