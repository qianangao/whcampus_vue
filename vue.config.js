const webpack = require("webpack")
module.exports={
    devServer:{
        proxy:{
            '/api': { //使用"/api"来代替"http://10.202.16.241:7532"
                target: "http://10.202.16.241:7532/api/v1/todayflow", //源地址
                changeOrigin: true, //改变源
                pathRewrite: {
                    '^/api': '' //路径重写
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    }
}