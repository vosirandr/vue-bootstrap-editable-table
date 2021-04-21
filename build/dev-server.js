/* eslint-disable no-console */

const path = require('path');
const open = require('open');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack-configs/dev/dev');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;

const app = express();
const compiler = webpack(webpackConfig);

// console.log(webpackConfig);
// return;

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: 'minimal',
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {
        /* empty */
    },
});

const reloadPluginName = 'ReloadAfterChange';
compiler.hooks.compilation.tap(reloadPluginName, (compilation) => {
    HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        reloadPluginName,
        (data, cb) => {
            hotMiddleware.publish({action: 'reload'});
            cb(null, data);
        });
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = 'http://localhost:' + port;

devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n');
});

module.exports = app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }

    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        open(uri);
    }
});
