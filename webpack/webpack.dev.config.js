const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, "..", "src/"),
    devServer: {
        host: 'localhost',                             // 指定host; 默认 localhost
        port: 3000,                                    // 指定端口号，默认8080
        contentBase: path.resolve(__dirname, '../dist'),  // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
        index: 'index.html',                           // 服务器启动的页面（同 html-webpack-plugin 中 filename 选项）; 默认值为 index.html
        compress: true,                                // 是否启用 gzip 压缩
        historyApiFallback: true,                      // 解决刷新cannot GET *url*
        hot: true,
        stats: 'errors-only',                          // webpack只输出错误日志
    },
    entry: [
        'react-hot-loader/patch',
        "./index.js"
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
};
