/*
* @Author: Administrator
* @Date:   2019-01-16 21:44:27
* @Last Modified by:   Administrator
* @Last Modified time: 2019-01-17 20:23:12
*/
'use strict';

require('page/common/nav-simple/index.js');
require('./index.css');


var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
    $element = $('.' + type + '-success').show();
});
