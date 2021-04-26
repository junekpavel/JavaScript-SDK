const path = require("path");
const webpack = require("webpack");
const PrettierPlugin = require("prettier-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
    library: "BugBattle",
    libraryTarget: "umd",
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          sourceMap: false,
          safari10: true,
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  devServer: {
    open: true,
    hot: true,
    host: "localhost",
    static: path.join(__dirname, "demo"),
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        use: ["url-loader"],
      },
    ],
  },
  plugins: [new PrettierPlugin()],
};
