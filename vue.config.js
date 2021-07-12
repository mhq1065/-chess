module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: "http://139.9.221.168:3000/",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}