// pages/goodsDetail/goodsDetail.js
const app = getApp();
import {
    Api
} from '../../models/api.js'
const apiModel = new Api()
var WxParse = require('../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    navicart() {
        if (!wx.getStorageSync('userInfo').avatarUrl) {
            wx.navigateTo({
                url: '/pages/login/login'
            })
            return;
        }
        wx.switchTab({
            url: '../cart/cart',
        })
    },
    onLoad: function(options) {
        console.log(options)
        this.goodsId = options.id;
        this.shopDel();
    },
    shopDel() { // 初始化商品详情
        let data = {
            id: this.goodsId
        }
        apiModel.findDetail(data)
            .then(res => {
                console.log(res)
                var article = res.data.remark;
                WxParse.wxParse('article', 'html', article, this, 5);
                this.setData({
                    detail: res.data
                })
            })
    },
    //立即购买
    naviDetail() {
        if (!wx.getStorageSync('userInfo').avatarUrl) {
            wx.navigateTo({
                url: '/pages/login/login'
            })

            return;
        }
        let id = this.data.detail.id
        wx.navigateTo({
            url: '../orderDetail/orderDetail?id=' + id,
        })
    },
    addCart(e) { //添加到购物车
        // console.log(e)
        // let goodsId = e.currentTarget.dataset.goodsid
        if (!wx.getStorageSync('userInfo').avatarUrl) {
            wx.navigateTo({
                url: '/pages/login/login'
            })
            return;
        }
        let data = {
            token: wx.getStorageSync('token'),
            quantity: '1',
            goodsId: this.goodsId

        }
        apiModel.addCart(data)
            .then(res => {
                console.log(res)
                if (res.msg === "SUCCESS") {
                    let data2 = {
                        token: wx.getStorageSync('token'),
                    }
                    apiModel.cartCount(data2).then(res => {
                        wx.setStorageSync('cartCount', res.data)
                        wx.showToast({
                            title: '添加成功',
                            icon: 'none',
                        })
                        this.onShow()
                    })
                } else {
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                    })
                }
                // this.setData({
                //   detail: res.data
                // })
            })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log(this.data.logval, wx.getStorageSync('userInfo').avatarUrl)
        if (!this.data.logval && !wx.getStorageSync('userInfo')) {
            wx.redirectTo({
                url: '/pages/mine/mine'
            })
            return;
        }
        this.setData({
            cartCount: wx.getStorageSync('cartCount')
        })

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})