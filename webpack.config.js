const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
// require("@babel/register");

// Webpack Configuration
const config = {
    // this is under development until it has no bugs
    mode: 'development',

    entry: [ /*'babel-polyfill', */ './src/index.js'],

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
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
            title: 'SkiFree Game'
        })
    ],
};

module.exports = config;
