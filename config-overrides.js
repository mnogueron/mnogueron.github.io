/* config-overrides.js */
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  if (env === 'production') {
    // remove GenerateSW plugin to add our own configuration
    config.plugins.map(plugin => {
      if (plugin.constructor.name === 'GenerateSW') {
        plugin.config.navigateFallbackBlacklist.push(new RegExp('^.*(/react-easy-panzoom/?).*$'))
      }
      return plugin
    })
  }

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
