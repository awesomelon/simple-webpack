const path = require('path'),
    HtmlWebPackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: 'static/js/bundle.js',
        path: path.resolve(__dirname + '../build')
    },
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, '../build'),
        index: 'index.html',
        port: 9000
    },
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
                            outputPath: 'static/images/',
                            postTransformPublicPath: p => `__webpack_public_path__ + ${p}`
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
                            outputPath: 'static/fonts/',
                            postTransformPublicPath: p => `__webpack_public_path__ + ${p}`
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            title: '개발용',
            template: './public/index.ejs',
            favicon: './public/favicon.ico',
            filename: 'index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'static/css/style.css'
        }),

        new CleanWebpackPlugin()
    ]
};
