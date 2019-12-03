// pages/login/login.js
const app = getApp()
import {
  Api
} from '../../models/api.js'
const apiModel = new Api()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  getUserInfo: function(e) {//获取用户信息
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    let data = {
      token: wx.getStorageSync('token'),
      json: e.detail.rawData,
    }
    if (e.detail.errMsg ==="getUserInfo:fail auth deny"){
	wx.showToast({
	title: '授权才能获得更好的体验喔~',
	icon:'none'
	})
    }else{
      apiModel.getUserInfo(data)
        .then(res => {
          console.log(res)
          wx.navigateBack({
            delta: 1
          })
		wx.setStorageSync("userInfo", JSON.parse(e.detail.rawData))
        })
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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