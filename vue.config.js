module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: "http://localhost:3000/",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/socket.io': {
                target: 'http://localhost:3000/socket.io',
                ws: true,
                changeOrigin: true
            },
        }
    }
}