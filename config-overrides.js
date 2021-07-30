const {
  override,
  setWebpackOptimizationSplitChunks,
  disableChunk,
  addWebpackAlias,
} = require('customize-cra');
const webpack = require('webpack');
const PACKAGE = require('./package.json');
const path = require('path');

function overrideConfig(config) {
  const { name, buildName } = PACKAGE;
  config.output = {
    ...config.output,
    filename: `${buildName || 'bundle'}.js`,
    chunkFilename: 'chunk-vendors.js',
    jsonpFunction: name,
  };

  config.optimization.runtimeChunk = false;

  return config;
}

module.exports = {
  webpack: override(
    useBabelRc(),
    overrideConfig,
    setWebpackOptimizationSplitChunks({
      cacheGroups: {
        vendor: {
          chunks: 'initial',
        },
      },
    }),
    disableChunk(), // chunk-vendor.js 파일 생성 X
    addWebpackAlias({
      '@': path.resolve(__dirname, './src'),
    }),
  ),
};
