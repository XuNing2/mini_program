//vue.config.js

module.exports = {
    publicPath: "./",
    outputDir: "dist",

    lintOnSave: true,
    runtimeCompiler: true, //关键点在这
    // 调整内部的 webpack 配置。
    // chainWebpack: (config) => {
    //   config.resolve.alias
    //   //set第一个参数：设置的别名，第二个参数：设置的路径
    //   .set('@',resolve('./src'))
    //   .set('components',resolve('./src/components'))
    //   .set('assets',resolve('./src/assets'))
    //   .set('views',resolve('./src/views'))
    // },
    // configureWebpack: () => {},
    // 配置 webpack-dev-server 行为。
    devServer: {
        //   open: process.platform === 'darwin',
        host: "127.0.0.1",
        port: 8080,
        https: false,
        timeout: 3 * 60 * 1000, // 请求超时时间
        hotOnly: false,
        proxy: {
            "/api": {
                // 请求的目标地址的BaseURL
                target: "https://z-hand.site/",
                changeOrigin: true, //是否开启跨域
                pathRewrite: {
                    "^/api": "", //规定请求地址以什么作为开头
                },
            },
        },
    },
};
