/*
* @Author: Administrator
* @Date:   2019-01-18 21:19:07
* @Last Modified by:   Administrator
* @Last Modified time: 2019-01-18 22:28:10
*/

'use strict';

require('page/common/nav-simple/index.js');
require('./index.css');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 登录页面表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init : function(){
        this.bindEvent();
    },

    //绑定事件
    bindEvent : function(){
        //异步检查用户名是否存在
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            //如果用户名为空不做验证
            if(!username ){
                return;
            }
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            });
        });

        var _this = this;
        //点击注册提交按钮
        $('#submit').click(function(){
            _this.submit();
        });

        //按下回车键提交登录按钮
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },

    submit : function(){
        //获取账号、密码
        var formData = {
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val()),
        },

        //表单账号密码验证结果
        validataResult = this.formValidate(formData);

        //判断验证结果
        if(validataResult.status){
            // 验证通过，提交进行用户登录
            _user.register(formData,function(res){
                window.location.href= './result.html?type=register';
            },function(errMsg){
            // 登录失败，登录界面显示错误信息
                formError.show(errMsg);
            });
        }else{
            // 验证不通过，错误提示
            formError.show(validataResult.msg);
        }
    },

    // 表达字段验证
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        }
        if(!_mm.validata(formData.username,'require')){
            result.msg = '用户名不能为空！';
            return result;
        };
        if(!_mm.validata(formData.password,'require')){
            result.msg = '密码不能为空！';
            return result;
        };

        if(formData.password.length < 6){
            result.msg = '密码长度不能小于 6 位！';
            return result;
        };

        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致！';
            return result;
        };

        if(!_mm.validata(formData.phone,'phone')){
            result.msg = '请输入正确的手机号码！';
            return result;
        };

        if(!_mm.validata(formData.email,'email')){
            result.msg = '邮箱格式不正确！';
            return result;
        };

        if(!_mm.validata(formData.question,'require')){
            result.msg = '密码提示问题不能为空！';
            return result;
        };
        if(!_mm.validata(formData.answer,'require')){
            result.msg = '密码提示问题答案不能为空！';
            return result;
        };

        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};

$(function(){
    page.init();
});
