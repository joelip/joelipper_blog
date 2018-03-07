const { join, resolve } = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

module.exports = env => {
  const { ifProd } = getIfUtils(env);

  const config = {
    context: resolve('source/javascripts'),
    entry: './site.js', // Path is relative to the "context" path
    output: {
      filename: 'bundle.js',
      path: resolve('.tmp/dist/javascripts'),
      publicPath: '/dist/javascripts/',
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'babel-preset-env',
                {
                  'targets': {
                    'browsers': ['last 2 versions', 'safari >= 7']
                  }
                }
              ]
            ]
          }
        }
      }]
    },
    plugins: removeEmpty([
      new ProgressBarPlugin()
    ])
  };

  return config;
}
