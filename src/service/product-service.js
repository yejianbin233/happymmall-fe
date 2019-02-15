/*
* @Author: Administrator
* @Date:   2019-02-10 16:11:32
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-12 18:41:01
*/
'use strict';

var _mm = require('util/mm.js');
var _product = {
    //获取商品列表
    getProductList : function(listParam,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    getProductDetail : function(productId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    
}

module.exports = _product;