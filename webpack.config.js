const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.join(__dirname),
    entry: ['./src/parallel-each.js', './index.js'],
    //entry: './src/parallel-each.js',
    output: {
        filename: '[name].js',
        //filename: 'parallel-each.js',
        publicPath: '/dist/',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.js/,
            exclude: /(node_modules)/,
            use: ['babel-loader']
        }]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    //mode: 'production'
};