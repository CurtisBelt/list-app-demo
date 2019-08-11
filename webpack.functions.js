const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'global.GENTLY': false
    }), // fix for https://medium.com/@danbruder/typeerror-require-is-not-a-function-webpack-faunadb-6e785858d23b
    new Dotenv()
  ],
  node: {
    __dirname: true
  }
}
