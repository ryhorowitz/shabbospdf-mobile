const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Suppress punycode deprecation warning
config.resolver.alias = {
  ...config.resolver.alias,
  punycode: false,
};

module.exports = config; 