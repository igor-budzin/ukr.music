import path from 'path';
import webpack from 'webpack';
import qs from 'querystring';

import autoprefixer from 'autoprefixer';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Uglify from 'uglifyjs-webpack-plugin';

const root = process.cwd();
const src  = path.join(root, 'src');
const build = path.join(root, 'build');

const clientSrc    = path.join(src, 'client');
const universalSrc = path.join(src, 'universal');
const sectionslSrc = path.join(src, 'universal', 'components', 'Sections');

const clientInclude = [clientSrc, universalSrc, sectionslSrc];

// Cache vendor && client javascript on CDN...
const vendor = [
  'react',
  'react-dom',
  'react-router',
  'react-redux',
  'redux'
];

export default {
  context: src,
  entry: {
    app: [
      'babel-polyfill/dist/polyfill.js',
      './client/client.js'
    ],
    vendor
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: build,
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js'],
    modules: [src, 'node_modules'],
    unsafeCache: true
  },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  plugins: [
   new webpack.NamedModulesPlugin(),
   new ExtractTextPlugin('[name].css'),
   new webpack.NormalModuleReplacementPlugin(/\.\.\/routes\/static/, '../routes/async'),
   new webpack.optimize.CommonsChunkPlugin({
     names: ['vendor', 'manifest'],
     minChunks: Infinity
   }),
   new webpack.optimize.AggressiveMergingPlugin(),
   /* minChunkSize should be 50000 for production apps
    * 10 is for this example */
   new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10}),
   // new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}, comments: /(?:)/}),
   new Uglify(),
   new AssetsPlugin({path: build, filename: 'assets.json'}),
   new webpack.NoEmitOnErrorsPlugin(),
   new webpack.DefinePlugin({
     '__CLIENT__': true,
     '__PRODUCTION__': true,
     'process.env.NODE_ENV': JSON.stringify('production')
   })
 ],
 module: {
   rules: [
     {
       test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
       use: {
         loader: 'url-loader',
         options: {
           limit: 10000
         }
       }
     },

     // JavaScript
     {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       include: clientInclude,
       query: { compact: false }
     },

     // JavaScript
     {
       test: /\.css|less$/,
       include: clientInclude,
       loaders: ExtractTextPlugin.extract({
         fallback: 'babel-loader',
         use: [
           {loader: 'style-loader!css-loader',
            options: {
              root: src,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }}
         ]})
     },

     // CSS
     // {
     //  test: /\.scss$/,
     //  include: clientInclude,
     //  loaders: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')
     // }
     {
      test: /\.scss$/,
      include: clientInclude,
      loaders: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: "css-loader!sass-loader"
      })
     }
   ]
 }
};
