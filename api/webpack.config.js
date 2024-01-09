const path = require("path");
const webpack = require("webpack");

module.exports = {
  target: "node",
  entry: "./src/index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    // Ignore pg-native module (optional dependency of 'pg')
    new webpack.IgnorePlugin({
      resourceRegExp: /^pg-native$/,
    }),
    // Ignore aws-crt module (optional dependency of AWS SDK)
    new webpack.IgnorePlugin({
      resourceRegExp: /^aws-crt$/,
    }),
    // Context replacement for Express dynamic requires
    new webpack.ContextReplacementPlugin(
      /express\/lib/,
      path.resolve(__dirname, "node_modules"),
      {
        // additional configurations if needed
      }
    ),
  ],
};
