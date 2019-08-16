module.exports = function (api) {
    api.cache(true);                                                // 必须，否则会报错
    
    const presets = [
        "@babel/preset-env",                                        // 只包含了规范中的语法转换
        "@babel/preset-react"
    ];
    
    const plugins = [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],                                // 必须放在proposal-class-properties之前
        ["@babel/plugin-proposal-class-properties", { "loose": true }],                           // 支持最新的JS特性
        ["import", { "libraryName": "antd", "libraryDirectory": "lib","style": true}],            // antd 按需加载
        ["@babel/plugin-proposal-optional-chaining"],                                             // 支持可选链(?.)语法 obj?.innerobj?.property
        ["react-hot-loader/babel"],
        ["@babel/plugin-syntax-dynamic-import"],
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "corejs": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ];

    return {
        presets,
        plugins
    };
}