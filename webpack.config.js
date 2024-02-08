const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/JavaScript/index.js",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "js/[name].[contenthash].js",
    assetModuleFilename: "img/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    port: 5000,
    open: {
      app: {
        name: "chrome",
      },
    },
    static: path.resolve(__dirname, "dist"),
  },

  mode: "production",
};
