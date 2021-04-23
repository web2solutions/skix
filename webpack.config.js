const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
require("@babel/register");

// Webpack Configuration
const config = {
    // this is under development until it has no bugs
    // mode: 'development',

    entry: [/*'babel-polyfill', */'./src/index.js'],

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },

    module: {
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.png$/,
                use: ['file-loader'],
            }
        ]
    },
    stats: {
        colors: true
    },
    // change
    // improve debugging by using a source map
    devtool: 'source-map',
    plugins: [
        new htmlWebpackPlugin({
            title: 'Ceros Ski'
        })
    ],
};

module.exports = config;
