/*
* @Author: Administrator
* @Date:   2019-02-12 15:23:12
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-14 17:09:46
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        productId     : _mm.getUrlParam('productId')    || '', 
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },

    onLoad : function(){
        // 如果没有传productId，自动跳转回首页
        
        if(!this.data.productId){
            _mm.goHome();
        }

        this.loadDetail();
    },

    bindEvent : function(){
        var _this = this;

        // 图片预览
        $(document).on('mouseenter','.p-img-item',function(){
            var imgUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src',imgUrl);
        });

        // count 操作
        $(document).on('click','.p-count-btn',function(){
            var type = $(this).hasClass('plus') ? 'plus' : 'minus';
            var $pCount = $('.p-count');
            var curCount = parseInt($pCount.val());
            var minCount = 1;
            var maxCount = _this.data.detailInfo.stock || 1;

            if(type === 'plus'){
                $pCount.val(curCount < maxCount ? curCount + 1 : maxCount);
            }else{
                $pCount.val(curCount > minCount ? curCount - 1 : minCount);
            }
        });

        // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
        
    },

    //加载 商品详细信息
    loadDetail : function(){
        var _this = this;
        var html = '';
        var $pageWrap = $('.page-wrap');
        //loading
        // $pageWrap.html('<div class="loading"></div>');

        
        _product.getProductDetail(this.data.productId,function(res){
            _this.filter(res);
            _this.data.detailInfo = res;
            html = _mm.renderHtml(templateIndex,res);
            $('.page-wrap').html(html);
        },function(errMsg){
            $('.page-wrap').html('<p class="err-tip">此商品不存在！</p>');
        });
    },

    // 为了数据匹配，将subImages存储的字符串转换成字符串数组
    filter : function(data){
        data.subImages = data.subImages.split(',');
    },

    
};

$(function(){
    page.init();
});