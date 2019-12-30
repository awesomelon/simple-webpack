const path = require('path'),
	HtmlWebPackPlugin = require('html-webpack-plugin'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	TerserPlugin = require('terser-webpack-plugin'),
	OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
	ImageminPlugin = require('imagemin-webpack');

module.exports = {
	entry: ['./src/index.ts'],
	output: {
		filename: 'static/js/bundle.[contenthash].js',
		path: path.resolve('build')
	},
	mode: 'production',
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)/,
				exclude: /(node_modules|bower_components|node_modules\/(?!(dom7|ssr-window|swiper)\/).*)/,
				use: {
					loader: 'babel-loader',
					options: {
						rootMode: 'upward'
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../../'
						}
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss'
						}
					},
					'sass-loader'
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'static/images/'
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'static/fonts/'
						}
					}
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					// cacheGroupKey here is `commons` as the key of the cacheGroup
					name(module, chunks, cacheGroupKey) {
						const moduleFileName = module
							.identifier()
							.split('/')
							.reduceRight(item => item);
						const allChunksNames = chunks.map(item => item.name).join('~');
						return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
					},
					chunks: 'all'
				}
			}
		},
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			title: '배포용',
			template: './public/index.ejs',
			favicon: './public/favicon.ico',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			filename: 'index.html'
		}),

		new MiniCssExtractPlugin({
			filename: 'static/css/style.[contenthash].css'
		}),

		// Make sure that the plugin is after any plugins that add images, example `CopyWebpackPlugin`
		new ImageminPlugin({
			bail: false, // Ignore errors on corrupted images
			cache: true,
			imageminOptions: {
				// Before using imagemin plugins make sure you have added them in `package.json` (`devDependencies`) and installed them

				// Lossless optimization with custom option
				// Feel free to experiment with options for better result for you
				plugins: [
					['gifsicle', { interlaced: true }],
					['jpegtran', { progressive: true }],
					['optipng', { optimizationLevel: 5 }],
					[
						'svgo',
						{
							plugins: [
								{
									removeViewBox: false
								}
							]
						}
					]
				]
			}
		}),

		new CleanWebpackPlugin()
	]
};
