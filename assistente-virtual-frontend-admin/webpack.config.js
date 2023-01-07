const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
require('dotenv').config()

module.exports = {
  // Other rules...
  plugins: [
    new Dotenv()
  ]
}
