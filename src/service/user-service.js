/*
* @Author: Administrator
* @Date:   2019-01-18 19:48:27
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-15 15:09:59
*/
'use strict';
var _mm = require('util/mm.js');
var _user = {
    //用户登录逻辑
    login : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    //检查用户名是否已存在
    checkUsername : function(username,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/check_valid.do'),
            data    : {
                type: 'username',
                str : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    // 检查登录状态
    checkLogin : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    //用户注册逻辑
    register : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    // 获取用户密码提示问题
    getQuestion : function(username,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject 
        });
    },

    // 检查密码提示问题答案
    checkAnswer : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject 
        });
    },

    resetPassword : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject 
        });
    },

    // 获取用户信息
    getUserInfo : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject 
        });
    },

    // 更新用户信息
    updateUserInfo : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject 
        });
    },

    // 登录状态下更新用户密码
    updatePassword : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject 
        });
    },
}

module.exports = _user;