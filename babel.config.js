module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  module: {
    rules: [{
      test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      loader: 'file-loader'
    }]
  }
}
