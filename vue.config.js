let proxyObj={};
let proxyRes={};

/**
 * 代理
 * @type {{changeOrigin: boolean, ws: boolean, pathRewrite: {"^/": string}, target: string}}
 */
proxyObj['/api']={
    //websocket
    ws:false,
    target:'http://localhost:8081',
    changeOrigin:true,
    //前缀转换
    pathRewrite: {
        '^/api':'/'
    },
}

proxyRes['/res']={
    target: 'http://139.224.47.80:8888',
    changeOrigin:true,
    pathRewrite: { '^/res': '' },
}

/**
 * 导出
 * @type {{devServer: {proxy: {}, port: number, host: string}}}
 */
module.exports={
    devServer:{
        /**
         * 可以访问的host
         */
        host:'localhost',
        port:8080,
        proxy:{
            '/api': {
                ws:false,
                target:'http://localhost:8081',
                changeOrigin:true,
                //前缀转换
                pathRewrite: {
                    '^/api':'/'
                },
            },
            '/res':{
                target: 'http://139.224.47.80:8888',
                changeOrigin:true,
                pathRewrite: { '^/res': '' },
            }
        }


    }
}