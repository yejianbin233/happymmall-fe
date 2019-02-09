/*
* @Author: Administrator
* @Date:   2019-02-09 18:41:10
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-09 19:44:45
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm     = require('util/mm.js');

var navSide = require('page/common/nav-side/index.js');

var _user = require('service/user-service.js');

var page = {
    init : function(){
        this.bindEvent();
        this.load();
    },

    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                password       : $.trim($('#password').val()),
                passwordNew    : $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),
            },

            validateResult = _this.validateForm(userInfo);

            if(validateResult.status){
                // 更改用户信息
                _user.updatePassword({
                    passwordOrd : userInfo.password,
                    passwordNew : userInfo.passwordNew,
                },function(res,msg){
                    _mm.successTips(msg);
                    
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    load : function(){
        // 初始化左侧菜单
        navSide.init({
            name : 'user-pass-update',
        });
    },

    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status : false,
            msg    : ''
        }

        if(!_mm.validata(formData.password,'require')){
            result.msg = '原密码不能为空！';
            return result;
        };

        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '新密码长度不能少于 6 位！';
            return result;
        };

        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次密码输入不一致！';
            return result;
        };
        

        result.status   = true;
        result.msg      = '验证通过';
        return result;
    },
}

$(function(){
    page.init();
});
