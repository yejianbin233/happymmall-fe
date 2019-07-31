/*
* @Author: Administrator
* @Date:   2019-07-30 13:35:04
* @Last Modified by:   Administrator
* @Last Modified time: 2019-07-30 16:41:25
*/
'use strict';
var _mm = require('util/mm.js');

var _adress = {
    // 获取地址列表
    getAdressList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50;
            },
            success : resolve,
            error   : reject
        });
    },
    // 新建收件人
    save : function(addressInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 更新收件人信息
    update : function(addressInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除收件人信息
    deleteAddress : function(shippingId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取单条收件人信息
    getAddress : function(shippingId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    }, 
}
module.exports = _adress;