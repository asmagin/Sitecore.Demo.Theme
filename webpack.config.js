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
      'script-loader!./src/scripts/bootstrap-colequalizer.js',
      'wowjs/dist/wow.js',
      'OwlCarousel/owl-carousel/owl.carousel.js',
      'ekko-lightbox/dist/ekko-lightbox.min.js',
      'ev-emitter/ev-emitter.js',
      'imagesloaded/imagesloaded.js'
    ],
    'framework': [
      './src/scripts/main.js',
      './src/scripts/carousel.js',
      './src/scripts/counter.js',
      './src/scripts/form.js',
      './src/scripts/grid.js',
      './src/scripts/lightbox.js',
      './src/scripts/popover.js',
      './src/scripts/search.js',
      './src/scripts/sidebar.js',
      './src/scripts/theming.js',
      './src/scripts/tooltip.js',
      './src/scripts/media-query.js'
    ],
    'vendor.css': [
      'bootstrap-block-grid/dist/bootstrap3-block-grid.css',
      'hover.css/css/hover.css',
      'animate.css/animate.css',
      'OwlCarousel/owl-carousel/owl.carousel.css'
    ],
    'default.css': [
      './src/styles/index.js',
    ],
    'niteflight.css': [
      './src/styles/niteflight.scss',
    ],
    'dayfrost.css': [
      './src/styles/dayfrost.scss',
    ],
    'white-wonder.css': [
      './src/styles/white-wonder.scss',
    ],
    'editors.css': [
      './src/styles/editors.scss',
    ]
  },
  output: {
    path: __dirname,
    filename: 'dist/scripts/[name].js',
    // library: ['Habitat', '[name]'],
    libraryTarget: 'window'
  },
  target: 'web',
  module: {
    rules: [{
        test: /\.css$/,
        include: /bootstrap3-block-grid/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize'
        }),
      },
      {
        test: /\.(s?)css$/,
        exclude: /bootstrap3-block-grid/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?minimize',
            'resolve-url-loader',
            'sass-loader?sourceMap',
          ],
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /fonts/,
        use: {
          loader: 'file-loader',
          options: {
            name: function (file) {
              return '/dist/images/[name].[ext]'
            }
          },
        },
      },
      {
        test: /\.(woff|svg|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'dist/fonts/',
            useRelativePath: true,
            publicPath: '/'
          },
        },
      },
      {
        test: /\.(woff|svg|woff2|eot|ttf|otf)$/,
        include: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'dist/fonts/',
            publicPath: '/'
          },
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('dist/styles/[name]'),
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
