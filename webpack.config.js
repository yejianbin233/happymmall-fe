/*
* @Author: Administrator
* @Date:   2019-01-03 21:45:39
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-09 18:46:08
*/
var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

//环境变量配置 dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';


var getHtmlConfig = function(name,title){
    return {
        template    : './src/view/' + name+ '.html',
        title       : title,
        filename    : 'view/' + name+ '.html',
        inject      : true,
        hash        : true,
        chunks      : ['common',name]
    }
};

var config  = {
    // 定义多入口
    entry           : {
                        'common'            : ['./src/page/common/index.js'],
                        'index'             : ['./src/page/index/index.js'],
                        'user-login'        : ['./src/page/user-login/index.js'],
                        'user-register'     : ['./src/page/user-register/index.js'],
                        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
                        'user-center'       : ['./src/page/user-center/index.js'],
                        'user-center-update': ['./src/page/user-center-update/index.js'],
                        'user-pass-update': ['./src/page/user-pass-update/index.js'],
                        'result'            : ['./src/page/result/index.js'],
    },

    output          : {
                        publicPath : '/dist',    //访问文件时的路径
                        path       : './dist',//存放文件时的路径
                        filename   : 'js/[name].js'
    },

    resolve         : {
                        alias   : {
                            util        : __dirname + '/src/util',
                            page        : __dirname + '/src/page',
                            service     : __dirname + '/src/service',
                            image       : __dirname + '/src/image',
                            node_modules: __dirname + '/node_modules',
                        }
    },
    // 外部依赖
    externals:{
        '$'         :'window.jQuery',
        'jquery'    :'window.jQuery'
    },

    plugins         : [
                        new webpack.optimize.CommonsChunkPlugin({
                            name        : 'common',
                            filename    : 'js/base.js'
                        }),

                        new ExtractTextPlugin('css/[name].css'),
                        
                        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),

                        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录页面')),

                        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册页面')),

                        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),

                        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),

                        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),

                        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),

                        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
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

                            //处理 string 的 loader
                            {
                                test:/\.string$/, 
                                loader: 'html-loader'
                            },
                        ]
    }


};

if ('dev' == WEBPACK_ENV) {
    //在'common': ['./src/page/common/index.js']中追加
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;