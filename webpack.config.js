"use strict";

const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./src/app.jsx"],

  devtool: "nosources-source-map",

  output: {
    path: path.resolve(__dirname + "/public/build/"),
    filename: "bundle.js",
    publicPath: "/build/"
  },

  resolve: {
    modules: ["node_modules", "src"]
  },

  plugins: [
    // new webpack.DefinePlugin({
    //   "process.env": {
    //     NODE_ENV: JSON.stringify("production")
    //   },
    //   wsURL: JSON.stringify("ws://wowdonate.info")
    // })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        },
        sourceMap: false
      })
    ]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /public/],
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: false,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "resolve-url-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              outputStyle: "expanded",
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)([\?]?.*)$/,
        loader: "file-loader"
      }
    ]
  }
};
