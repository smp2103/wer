"use strict";

// 컴퓨터나 서버에서의 전체 경로를 갖게해주는 코드 ex) /users/smp/...
var path = require("path");

var autoprefixer = require("autoprefixer");

var ExtractCSS = require("mini-css-extract-plugin");

var MODE = process.env.WEBPACK_ENV; // for file

var ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); // for directory

var OUTPUT_DIR = path.join(__dirname, "static");
var config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [{
      test: /\.(js|scss)$/,
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
      /* devMode ? 'style-loader' : */
      ExtractCSS.loader, 'css-loader', {
        loader: 'postcss-loader',
        options: {
          plugins: function plugins() {
            return [autoprefixer({
              browsers: "cover 99.5%"
            })];
          }
        }
      }, 'sass-loader']
    }]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS({
    filename: "styles.css"
  })]
};
module.exports = config;