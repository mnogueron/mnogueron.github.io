/* config-overrides.js */
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.plugins.push(new ImageminPlugin({
    disable: env !== 'production', // Disable during development
    jpegtran: null,
    pngquant: {
      quality: '75-90',
    },
    plugins: [
      imageminMozjpeg({
        quality: 60,
        progressive: true,
      }),
    ],
  }))

  return config
}
