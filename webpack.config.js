const base = require('./webpack/webpack.base.config');
const merge = require('webpack-merge');

let config;
if (process.env.NODE_ENV === 'production') {
    config = require('./webpack/webpack.pro.config');
} else {
    config = require('./webpack/webpack.dev.config');
}

module.exports = merge(base, config);