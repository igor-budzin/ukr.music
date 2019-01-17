import path from 'path';
import webpack from 'webpack';
import qs from 'querystring';

const root = process.cwd();
const src  = path.join(root, 'src');

const clientSrc    = path.join(src, 'client');
const universalSrc = path.join(src, 'universal');
const sectionslSrc = path.join(src, 'universal', 'components', 'Sections');
const nodeModules = path.join(root, 'node_modules');

const clientInclude = [clientSrc, universalSrc, sectionslSrc, nodeModules];

const babelQuery = {
  "presets": [
    "react",
    ["es2015", { "modules": false }],
    "stage-0"
  ],
  "compact" : false,
  "plugins": [
    "transform-decorators-legacy",
    "react-hot-loader/babel"
  ]
};

export default {
  devtool: 'eval',
  context: src,
  entry: {
    app: [
      'babel-polyfill/dist/polyfill.js',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=false',
      './client/client.js'
    ]
  },
  output: {
    filename: 'app.js',
    chunkFilename: '[name]_[chunkhash].js',
    path: path.join(root, 'build'),
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      '__CLIENT__': true,
      '__PRODUCTION__': false,
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  resolve: {
    extensions: ['.js'],
    modules: [src, 'node_modules']
  },
  module: {
    loaders: [
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      },

      // Javascript
      {test: /\.js$/,
       loader: 'babel-loader',
       query: babelQuery,
       include: clientInclude
      },

      // CSS
      {test: /\.css$/,
       include: clientInclude,
       use: [
         {loader: 'style-loader'},
         {loader: 'css-loader',
          options: {
            root: src,
            modules: true,
            importLoaders: 1,
            query: {compact: false},
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }}
       ]
      },

      // SCSS
      {test: /\.scss$/,
       include: clientInclude,
       use: [
         {loader: 'style-loader'},
         {loader: 'css-loader',
          options: {
            root: src,
            
            importLoaders: 1,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }},
          {loader: 'sass-loader'}
       ]
      }
    ]
  }
};
