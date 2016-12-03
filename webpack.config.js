// webpack.config.js
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const paths = {
  app: path.join(__dirname, 'app'),
  style: path.join(__dirname, 'style', 'app.css'),
  build: path.join(__dirname, 'build')
}

module.exports = {
  entry: {
    app: paths.app,
    style: paths.style
  },

  output: {
    path: paths.build,
    filename: '[name].js',
    publicPath: 'http://localhost:8080/build/'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', include: paths.app},
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css'), include: paths.style }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  target : 'electron-renderer'
};