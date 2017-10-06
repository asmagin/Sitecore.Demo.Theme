var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'vendor/modernizr': [
      'script-loader!npm-modernizr',
      'Chart.js'
    ],
    'vendor': [
      'script-loader!./node_modules/ace-builds/src-min/ace.js',
      'script-loader!./node_modules/ace-builds/src-min/mode-html.js',
    ],
    'jquery.modern': 'expose-loader?$!expose-loader?jQuery!jquery',
    'plugins': [
      'bootstrap-sass/assets/javascripts/bootstrap/affix.js',
      'bootstrap-sass/assets/javascripts/bootstrap/alert.js',
      'bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
      'bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
      'bootstrap-sass/assets/javascripts/bootstrap/modal.js',
      'bootstrap-sass/assets/javascripts/bootstrap/transition.js',
      'bootstrap-sass/assets/javascripts/bootstrap/button.js',
      'bootstrap-sass/assets/javascripts/bootstrap/popover.js',
      'bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
      'bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
      'bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
      'bootstrap-sass/assets/javascripts/bootstrap/tab.js',
      'script-loader!./node_modules/shufflejs/dist/jquery.shuffle.js',
      'script-loader!./scripts/bootstrap-colequalizer.js',
      'wowjs/dist/wow.js',
      'OwlCarousel/owl-carousel/owl.carousel.js',
      'ekko-lightbox/dist/ekko-lightbox.min.js',
      'ev-emitter/ev-emitter.js',
      'imagesloaded/imagesloaded.js'
    ],
    'framework': [
      './scripts/main.js',
      './scripts/carousel.js',
      './scripts/counter.js',
      './scripts/form.js',
      './scripts/grid.js',
      './scripts/lightbox.js',
      './scripts/popover.js',
      './scripts/search.js',
      './scripts/sidebar.js',
      './scripts/theming.js',
      './scripts/tooltip.js',
      './scripts/media-query.js'
    ],
    'vendor.css': [
      'bootstrap-block-grid/dist/bootstrap3-block-grid.css',
      'hover.css/css/hover.css',
      'animate.css/animate.css',
      'OwlCarousel/owl-carousel/owl.carousel.css'
    ],
    'default.css': [
      './sass/index.js',
    ],
    'niteflight.css': [
      './sass/niteflight.scss',
    ],
    'dayfrost.css': [
      './sass/dayfrost.scss',
    ],
    'white-wonder.css': [
      './sass/white-wonder.scss',
    ]
  },
  output: {
    path: __dirname,
    filename: 'demo/scripts/[name].js',
    // library: ['Habitat', '[name]'],
    libraryTarget: 'window'
  },
  target: 'web',
  module: {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize'
        }),
        include: /bootstrap3-block-grid/
      },
      {
        test: /\.(s?)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?minimize',
            'resolve-url-loader',
            'sass-loader?sourceMap',
          ],
        }),
        exclude: /bootstrap3-block-grid/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: function (file) {
              return '/demo/images/[name].[ext]'
            }
          },
        },
        exclude: /fonts/
      },
      {
        test: /\.(woff|svg|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/demo/fonts/',
            useRelativePath: true,
            publicPath: '/'
          },
        },
        exclude: /node_modules/
      },
      {
        test: /\.(woff|svg|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'demo/fonts/',
            publicPath: '/'
          },
        },
        include: /node_modules/
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('demo/styles/[name]'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor/modernizr',
      // (the commons chunk name)

      minChunks: Infinity,
      // (Modules must be shared between 3 entries)
    }),
  ]
};
