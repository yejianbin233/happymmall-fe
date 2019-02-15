/*
* @Author: Administrator
* @Date:   2019-01-03 22:26:11
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-12 19:23:42
*/


'use strict';


require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('util/slider/index.js');

var _mm = require('util/mm.js');
var templateBanner = require('./banner.string');

$(function(){

    // 渲染 banner 的 html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化 banner
    var slider = $('.banner').unslider({
        dots:true
    });

    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        slider.data('unslider')[forward]();
    });
});
