/*
* @Author: Administrator
* @Date:   2019-02-14 14:23:38
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-15 15:15:50
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');

var nav = require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');

var templateIndex = require('./index.string');

var page = {
    data : {
        
    },
    init : function(){
        this.onLoad();
        // this.bindEvent();
    },

    onLoad : function(){
        // 如果没有传productId，自动跳转回首页
        
        // if(!this.data.productId){
        //     _mm.goHome();
        // }

        this.loadCart();
    },

    bindEvent : function(){
        var _this = this;

        // 商品选择 - 单选
        $(document).on('click','.cart-select',function(){
            var $this = $(this);
            var productId = $this.parents('.cart-table').data('product-id');
            if($this.is(':checked')){
                _cart.selectProduct(productId,function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                });  
            }
            else{
                _cart.unSelectProduct(productId,function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                }); 
            }
        });

        // 全选 / 取消全选
        $(document).on('click','.cart-select-all',function(){
            var $this = $(this);
            
            if($this.is(':checked')){
                _cart.selectProduct(function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                });  
            }
            else{
                _cart.unSelectProduct(function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError();
                }); 
            }
        });

        // 商品数量变化
        $(document).on('click','.count-btn',function(){
            var $this = $(this);
            var $pCount = $this.siblings('.count-input');
            var curCount = parseInt($pCount.val());
            var type = $this.hasClass('plus') ? 'plus' : 'minus';
            var productId = $this.parents('.cart-table').data('product-data');
            var minCount = 1;
            var maxCount = parseInt($pCount.data('max'));
            var newCount = 0;

            if(type === 'plus'){
                if(curCount >= maxCount){
                    _mm.errTips('该商品数量已达到上限');
                    return;
                }
                newCount = curCount + 1;
            }else if(type === 'minus'){
                if(curCount <= minCount){
                    return;
                }
                newCount = curCount - 1;
            }

            // 更新购物车商品数量
            _cart.updateProduct({
                productId : productId,
                count : newCount
            },function(res){
                _this.renderHtml(res);
            },function(errMsg){
                _this.showCartError();
            });
        });

        // 删除单个商品按钮
        $(document).on('click','.cart-delete',function(){
            if(window.confirm('确认要删除该商品吗？')){
                var productId = $(this).parents('.cart-table')
                    .data('product-id');

                _this.deleteCartProduct(productId);
            }
        });

        // 删除选中商品按钮
        $(document).on('click','.delete-selected',function(){
            if(window.confirm('确认要删除选中商品吗？')){
                var arrProductIds = [];
                var $selectedItem = $('.cart-select:checked');
                // 循环查找选中的 productId
                for(var i=0,iLength=$selectedItem.length;i<iLength;i++){
                    arrProductIds.push($($selectedItem[i])
                        .parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    // 数组的 join ，将数组内的元素转换为字符串并以 ，分割
                    _this.deleteCartProduct(arrProductIds.join(','));
                }else{
                    _mm.errorTips('您还没有选中要删除的商品！');
                }
            }
        });

        // 提交购物车
        $(document).on('click','.btn-submit',function(){
            // 总价大于 0 ,进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice >0){
                window.location.href="./confirm.html";
            }else{
                _mm.errorTips('请选择商品后提交！');
            }
        });
    },

    //加载 购物车列表信息
    loadCart : function(){
        var _this = this;
        
        // 获取购物车列表
        _cart.getCartList(function(res){
            _this.renderCart(res);
        },function(errMsg){
            _this.showCartError();
        });  
    },

    renderCart : function(data){
        this.filter(data);
        // 缓存购物车信息
        this.data.cartInfo = data;
        // 生成 HTML 
        var cartHtml = _mm.renderHtml(templateIndex,data);
        $('.page-wrap').html(cartHtml);

        // 通过导航栏购物车更新数量
        nav.loadCartCount();
    },

    // 为了数据匹配，将subImages存储的字符串转换成字符串数组
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },

    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    },

    showCartError : function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了,刷新下试试吧！</>');
    },

    // 删除指定商品,支持批量,productId 用逗号分隔
    deleteCartProduct : function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds,function(res){
            _this.renderHtml(res);
        },function(){
            _this.showCartError();
        });
    }


};

$(function(){
    page.init();
});