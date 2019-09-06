const path = require('path'),
    HtmlWebPackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ImageminPlugin = require('imagemin-webpack-plugin').default,
    TerserPlugin = require('terser-webpack-plugin'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: 'static/js/bundle.[contenthash].js',
        path: path.resolve('build')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components|node_modules\/(?!(dom7|ssr-window|swiper)\/).*)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        rootMode: 'upward'
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
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
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['> 1%', 'last 2 versions']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static/images/',
                            postTransformPublicPath: p => `__webpack_public_path__ + ${p}`
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
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
            title: 'webpack test',
            template: './public/index.html',
            favicon: './public/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            filename: 'index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'static/css/style.[contenthash].css'
        }),

        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            cache: true
        }),

        new CleanWebpackPlugin()
    ]
};
