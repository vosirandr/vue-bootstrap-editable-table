const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const utils = require('./utils');

module.exports = {
    // resets the default mode
    mode: 'none',

    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            // use the full development build of Vue
            // see: https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds
            'vue$': 'vue/dist/vue',
        },
    },

    module: {
        rules: [
            utils.withCacheLoader({
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false,
                    },
                },
            }),
            utils.withCacheLoader({
                test: /\.js$/,
                loader: 'babel-loader',
                include: ['src', 'dev', 'test'].map(utils.resolve),
            }),
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
        ],
    },

    optimization: {
        concatenateModules: true,
        noEmitOnErrors: true,
    },

    node: {
        process: false,
    },

    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            PKG_VERSION: JSON.stringify(require('../../package').version),
            'process.env.BUILD': JSON.stringify('web'),
        }),
    ],
};
