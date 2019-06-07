const path = require('path'),
    HtmlWebPackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname + '../build')
    },
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, '../build'),
        index: 'index.html',
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components|node_modules\/(?!(dom7|ssr-window|swiper)\/).*)/,
                use: {
                    loader: 'babel-loader'
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
                    MiniCssExtractPlugin.loader,
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
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'webpack test',
            template: './public/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            filename: 'index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),

        new CleanWebpackPlugin()
    ]
};
