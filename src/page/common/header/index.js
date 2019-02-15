/*
* @Author: Administrator
* @Date:   2019-01-10 21:21:29
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-11 17:02:04
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');


// 通用页面头部
var header = {
    init : function(){
        this.bindEvent(); 
        this.onLoad();
    },
    //加载页面时,在搜索框里显示url中的关键字
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
            $('.search-input').val(keyword);
        }
    },
    
    bindEvent : function(){
        var _this = this;
        // 点击搜索，做搜索提交
        $('.search-btn').click(function(){
            _this.searchSubmit();
        });
        // 直接回车，做搜索提交
        $('.search-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    // 搜索提交
    searchSubmit : function(){
        var keyword = $.trim($('.search-input').val());
        if(keyword){
            window.location.href='./list.html?keyword=' + keyword;
        }else{
            _mm.goHome();
        }
    },

};

header.init();