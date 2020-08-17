const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: 'none', 
  entry:  {
    app: './src/App.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'var',
    library: 'app'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ]
          }
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({ 
      patterns: [
      './src/Code.js',
      './src/appsscript.json'
      ]
    })
  ]
};
