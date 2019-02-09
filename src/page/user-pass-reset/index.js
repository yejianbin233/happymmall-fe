/*
* @Author: Administrator
* @Date:   2019-02-01 20:52:17
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-01 22:36:08
*/
'use strict';
require('./index.css');

require('page/common/nav-simple/index.js');

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
    data : {
        username    : '',
        question    : '',
        answer      : '',
        token       : '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },

    onLoad : function(){
        this.loadStepUsername();
    },

    //绑定事件
    bindEvent : function(){
        var _this = this;
        //点击登录提交按钮
        // 第一个事件，输入用户名后按钮点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());

            // 判断用户名存在
            if(username){
                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res;

                    _this.loadStepQuestion();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else{
                formError.show('请输入用户名');
            }
        });

        // 第二个事件,输入密码提示问题答案中的按钮点击
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());

            // 检查密码提示问题答案
            if(answer){
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                },function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;

                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 密码提示答案为空
            else{
                formError.show('请输入正确的密码提示答案！');
            }
        });

        // 第三个事件,输入新密码后的按钮点击
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());

            // 检查密码是否为空
            if(password && password.length >= 6){
                _user.resetPassword({
                    username        : _this.data.username,
                    passwordNew     : password,
                    forgetToken     : _this.data.token
                },function(res){
                    window.location.href = './result.html?type=pass-reset';
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 密码为空
            else{
                formError.show('请输入不少于 6 位的新密码！');
            }
        });

        // //按下回车键提交登录按钮
        // $('.user-content').keyup(function(e){
        //     if(e.keyCode === 13){
        //         _this.submit();
        //     }
        // });
    },

    // 加载输入用户名的一步
    loadStepUsername : function(){
        $('.step-username').show();
    },

    // 加载输入密码提示答案的一步
    loadStepQuestion : function(){
        // 隐藏错误提示
        formError.hide();

        // 做容器的切换
        // $('.step-username').hide()
        //     .siblings('.step-question').show()
        //     .find('.question').text(this.data.question);
        $('.step-username').hide();
        $('.step-question').show();
        $('.question').text(this.data.question);
    },

    // 加载输入password的一步
    loadStepPassword : function(){
        // 隐藏错误提示
        formError.hide();
        $('.step-question').hide()
            .siblings('.step-password').show();
    },
};

$(function(){
    page.init();
});
