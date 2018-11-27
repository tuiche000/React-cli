// webpack.prod.conf.js 文件
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: "js/[name].[chunkhash:16].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    new CleanWebpackPlugin(['../dist'], { allowExternal: true })
  ]
});