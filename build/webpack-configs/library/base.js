const webpack = require('webpack');
const merge = require('webpack-merge');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const config = require('../../config');
const utils = require('../utils');
const banner = require('../banner');
const baseWebpackConfig = require('../base');

const baseLibraryWebpackConfig = merge(baseWebpackConfig, {
    entry: {
        VueEditableTable: utils.resolve('src/index.js'),
    },

    output: {
        path: config.library.assetsRoot,
        publicPath: config.library.assetsPublicPath,
        library: 'VueEditableTable',
    },

    plugins: [
        new webpack.BannerPlugin(banner),
    ],
});

if (config.library.bundleAnalyzerReport) {
    baseLibraryWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = baseLibraryWebpackConfig;
