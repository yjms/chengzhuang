// pages/cart/cart.js
import {
  Api
} from '../../models/api.js'
const apiModel = new Api()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  tradeNo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.setData({ tradeNo: options.tradeNo})
	  this.initData();
  },
initData(){//初始化物流信息
	let data = {
		token: wx.getStorageSync('token'),
		tradeNo:this.data.tradeNo
	}
	apiModel.eps(data)
		.then(res => {
			console.log(res)
			let data = JSON.parse(res.data.content)
			console.log(data)
			let time =
				this.setData({
					eps: data,
					eps2: res.data,
					order: res.data.order.rels[0].goods
				})
		})
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})