/*
* @Author: Administrator
* @Date:   2019-01-16 19:18:34
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-09 19:00:23
*/
/*
* @Author: Administrator
* @Date:   2019-01-16 19:18:34
* @Last Modified by:   Administrator
* @Last Modified time: 2019-01-16 20:10:33
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var navSide = {
    option : {
        name : '',
        navList : [
            {name : 'user-center',desc : '个人中心',href : './user-center.html'},
            {name : 'order-list',desc : '我的订单',href : './order-list.html'},
            {name : 'user-pass-update',desc : '修改密码',href : './user-pass-update.html'},
            {name : 'about',desc : '关于MMall',href : './about.html'}
        ]
    },

    init : function(option){
        //将默认定义的 option 与传入的 option 合并
        //第一个参数 this.option 会被 第二个参数 option 修改。
        $.extend(this.option,option);
        this.renderNav();
    },

    //渲染导航菜单
    renderNav : function(){
        //计算 active 数据
        for(var i=0,iLength = this.option.navList.length; i<iLength ;i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };

        //渲染 list 数据
        var navHtml = _mm.renderHtml(templateIndex,{
            navList : this.option.navList
        });

        //把 html 放入容器
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;