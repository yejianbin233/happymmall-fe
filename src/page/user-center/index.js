/*
* @Author: Administrator
* @Date:   2019-02-02 18:45:31
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-02 20:02:26
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm     = require('util/mm.js');

var navSide = require('page/common/nav-side/index.js');

var templateIndex = require('./index.string');

var _user = require('service/user-service.js');

var page = {
    init : function(){
        this.load();
    },

    load : function(){
        // 初始化左侧菜单
        navSide.init({
            name : 'user-center',
        });
        // 加载用户信息
        this.loadUserInfo();
    },

    //加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
}

$(function(){
    page.init();
});
