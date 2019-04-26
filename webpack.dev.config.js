"use strict";

const webpack = require("webpack");
const path = require("path");

module.exports = {
  bail: true,
  cache: true,
  entry: ["babel-polyfill", "./src/app.jsx"],
  devtool: "eval",

  devServer: {
    port: 3050,
    historyApiFallback: {
      index: "public/index.html"
    }
  },

  output: {
    path: path.join(__dirname, "/public/build/"),
    filename: "bundle.js",
    publicPath: "/build/"
  },

  resolve: {
    modules: ["node_modules", "src"]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /public/],
        use: [{ loader: "babel-loader", options: { cacheDirectory: true } }]
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
          {
            loader: "cache-loader"
          },
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: false,
              importLoaders: 2,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              outputStyle: "expanded",
              sourceMap: false,
              sourceMapContents: false
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
