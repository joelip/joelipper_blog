const { join, resolve } = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env);

  const extractSass = new ExtractTextPlugin({
    filename: ifProd('[name].[chunkhash].css', '[name].css')
  });

  const config = {
    context: resolve('source'),
    entry: {
      site: './javascripts/site.js',
      styles: ['./stylesheets/landing.css.sass']
    },
    output: {
      filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      path: resolve('.tmp/dist/'),
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      rules: [
        {
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
        },
        {
          test: /\.sass$/,
          use: extractSass.extract({
            use: [
              { loader: 'css-loader' },
              { loader: 'sass-loader' }
            ],
            fallback: 'style-loader'
          })
        },
      ]
    },
    plugins: removeEmpty([
      new ProgressBarPlugin(),
      extractSass
    ])
  };

  return config;
}
