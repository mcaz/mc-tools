const path = require('path');
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  cache: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.gs',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new GasPlugin()
  ]
}