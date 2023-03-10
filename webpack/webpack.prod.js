const commonConfig = require('./webpack.common');
const { EsbuildPlugin } = require('esbuild-loader');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = merge(commonConfig, {
  output: {
    filename: 'js/[name].[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css'
    }),
    new WebpackManifestPlugin({
      publicPath: ''
    })
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react-vendor'
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
        },
      }
    },
    minimizer: [
      new EsbuildPlugin({
        target: 'es2015'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        favicon: path.resolve(__dirname, '../public/favicon.ico'),
        templateParameters: {
          description: process.env.META_DESCRIPTION,
          title: process.env.APP_TITLE
        },
        minify: {
          removeAttributeQuotes: true,
          removeComments: true,
          collapseWhitespace: true
        }
      })
    ]
  },
  cache: {
    compression: 'brotli',
    maxAge: 604_800_000  // 1 week in milliseconds
  }
});
