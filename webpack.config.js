const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const config = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.css$/,
        loaders: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  externals: {
    moment: 'moment',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
};

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-owl-carousel.min.js',
      libraryTarget: 'window',
      library: 'VueOwlCarousel',
    },
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/Carousel.vue'),
    output: {
      filename: 'vue-owl-carousel.js',
      libraryTarget: 'umd',
      library: 'vue-owl-carousel',
      umdNamedDefine: true,
    },
  }),
];
