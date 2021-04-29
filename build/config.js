const utils = require('./webpack-configs/utils');

const dev = {
    port: 10388,
    autoOpenBrowser: false,
    assetsSubDirectory: '/',
    assetsPublicPath: '/',
    tmpDir: utils.resolve('.tmp')
};

const library = {
    assetsRoot: utils.resolve('dist'),
    assetsPublicPath: '/',
    assetsSubDirectory: '/',
    bundleAnalyzerReport: process.env.npm_config_report,
    libraryTargetPlaceholder: '[LIBRARY_TARGET]',
};

module.exports = {dev, library};
