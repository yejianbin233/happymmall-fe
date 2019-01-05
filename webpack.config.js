/*
* @Author: Administrator
* @Date:   2019-01-03 21:45:39
* @Last Modified by:   Administrator
* @Last Modified time: 2019-01-04 22:37:29
*/
var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

//环境变量配置 dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';


var getHtmlConfig = function(name){
    return {
        template    : './src/view/' + name+ '.html',
        filename    : 'view/' + name+ '.html',
        inject      : true,
        hash        : true,
        chunks      : ['common',name]
    }
};

var config  = {
    // 定义多入口
    entry           : {
                        'common': ['./src/page/common/index.js'],
                        'index' : ['./src/page/index/index.js'],
                        'login' : ['./src/page/login/index.js'],
    },

    output          : {
                        publicPath : '/dist',    //访问文件时的路径
                        path       : './dist',//存放文件时的路径
                        filename   : 'js/[name].js'
    },

    // 外部依赖
    externals       : {
                        'jquery' : 'window.jQuery'//引入jquery依赖
    },

    plugins         : [
                        new webpack.optimize.CommonsChunkPlugin({
                            name        : 'common',
                            filename    : 'js/base.js'
                        }),

                        new ExtractTextPlugin('css/[name].css'),
                        
                        new HtmlWebpackPlugin(getHtmlConfig('index')),

                        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ],
    module          : {
                        loaders: [
                            {
                                test:/\.css$/, 
                                loader: ExtractTextPlugin.extract('style-loader','css-loader')
                            },

                            {
                                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
                                loader: 'url-loader',
                                
                            },
                        ]
    }


};

if ('dev' == WEBPACK_ENV) {
    //在'common': ['./src/page/common/index.js']中追加
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;