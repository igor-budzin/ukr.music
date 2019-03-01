import path from 'path';
import webpack from 'webpack';
import qs from 'querystring';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Uglify from 'uglifyjs-webpack-plugin';

// Paths
const root = process.cwd();
const src  = path.join(root, 'src');
const build = path.join(root, 'build');
const universal = path.join(src, 'universal');
const sectionslSrc = path.join(src, 'universal', 'components', 'Sections');

const server = path.join(src, 'server');
const nodeModules = path.join(root, 'node_modules');


const serverInclude = [server, universal, sectionslSrc, nodeModules];

export default {
	context: src,
	entry: {
		prerender: './universal/routes/Routes.js'
	},
	target: 'node',
	output: {
		path: build,
		chunkFilename: '[name].js',
		filename: '[name].js',
		libraryTarget: 'commonjs2',
		publicPath: '/static/'
	},
	resolve: {
		extensions: ['.js'],
		modules: [src, 'node_modules']
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin('[name].css'),
		// new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
		new Uglify(),
		new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
		new webpack.DefinePlugin({
			'__CLIENT__': false,
			'__PRODUCTION__': true,
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	],
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

			{
				test: /\.css$/,
				include: serverInclude,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{loader: 'css-loader',
						 options: {
							 root: src,
							 modules: true,
							 importLoaders: 1,
							 localIdentName: '[name]_[local]_[hash:base64:5]'
						 }}
					]})
			},

			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: serverInclude,
				exclude: /node_modules/,
				query: { compact: false }
			},

			{
				test: /\.scss$/,
				include: serverInclude,
				loaders: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: "css-loader!sass-loader"
				})
			}

		]
	}
};
