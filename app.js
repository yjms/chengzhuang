//app.js
const mta = require('./utils/mta_analysis.js');
import {
  Api
} from './models/api.js'
const apiModel = new Api()
let app = new getApp();
App({
  onLaunch: function(options) {
	// app.globalData.isyh_card = options.query.channelId || decodeURIComponent(options.query.scene).split("=")[1];
    // 展示本地存储能力
	  mta.App.init({
		  "appID": "500701968",
		  "eventID": "500701969",
		  "autoReport": true,
		  "statParam": true,
		  "ignoreParams": [],
		  "statPullDownFresh": true,
		  "statShareApp": true,
		  "statReachBottom": true
	  });
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,//全局存储用户信息
    selected: "",//是否选择
    cartCount:"",//购物车
	isyh_card:""//是否要领优惠券
  }
})