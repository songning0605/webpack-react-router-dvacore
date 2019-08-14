const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function resolve(dir) {
  return path.resolve(__dirname, "..", dir);
}

module.exports = {
  context: path.resolve(__dirname, "..", "src/"),
  entry: "./index.js", // 打包后输出的文件名 为 main.js
  output: {
    path: resolve("dist"), // 打包后项目 输出到项目根目录下 dist 文件夹
    filename: "index.[hash:8].js", // 输出的 入口JS文件名称
    publicPath: "/"
  },

  resolve: {
    alias: {
      "@src": resolve("src"),
    },
    modules: [
      // 优化模块查找路径
      resolve("src"),
      resolve("node_modules") // 指定node_modules所在位置 当你import第三方模块式 直接从这个路径下搜寻
    ],
    extensions: [".js"]
  },

  // loader 相关配置
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 匹配.js文件<></>
        use: { loader: "babel-loader" },
        exclude: /node_modules/, // 排除不要加载的文件夹
        include: resolve("src") // 指定需要加载的文件夹
      }
    ]
  },

  // 插件 相关配置
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", // 文件名; 默认是index.html
      template: "./index.html", // 指定模板html文件
      hash: true // 默认值为false, 值为true时，html 引入的脚本、css都加hash值（清除缓存）
    })
  ]
};
