/*
* @Author: Administrator
* @Date:   2019-07-30 18:23:14
* @Last Modified by:   Administrator
* @Last Modified time: 2019-07-31 15:09:07
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _order          = require('service/order-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data:{
        orderNumber : _mm.getUrlParam("orderNumber")
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on("click",".order-cancel",function(){
            if (window.confirm("确定要取消改订单吗?")) {
                _order.cancelOrder(_this.data.orderNumber,function(res){
                    _mm.successTips('取消订单成功');
                    _this.loadDetail();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });

        // 加载订单详情
        this.loadDetail();
    },
    // 加载订单列表
    loadDetail : function(){
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber,function(){
            _this.dataFilter(res);
            // 渲染 html
            orderDetailHtml = _mm.rendHtml(templateIndex,res);
            $content.html(orderDetailHtml);
        },function(errMsg){
            $content.html('<p class="err-tip">'+errMsg+'</p>');
        });
    },
    // 数据的适配
    dataFilter : function(data){
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};
$(function(){
    page.init();
});