const { join, resolve } = require('path');
const webpackValidator = require('webpack-validator');
const { getIfUtils } = require('webpack-config-utils');

module.exports = env => {
  const { ifProd } = getIfUtils(env);

  return webpackValidator({
    context: resolve('source/javascripts'),
    entry: './site.js', // Path is relative to the "context" path
    output: {
      filename: 'bundle.js',
      path: resolve('.tmp/dist/javascripts'),
      publicPath: '/dist/javascripts/',
    },
    devtool: ifProd('source-map', 'eval'),
  })
}
