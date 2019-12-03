// pages/myOrderSend/myOrderSend.js
import {
  Api
} from '../../models/api.js'
const apiModel = new Api()

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  sid:null,
	  oid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let id = parseInt(options.id)
	this.setData({ oid:options.id})
    console.log(id)
   
  },
  orderDel(){//订单详情
	  let data = {
		  token: wx.getStorageSync('token'),
		  id: this.data.oid
	  }
	  apiModel.orderDetail(data)
		  .then(res => {
			  console.log(res)
			  this.esp = res.data.rels[0].tradeNo
			  this.eps2(res.data.rels[0].tradeNo)
			  this.setData({
				  detail: res.data,
				  tradeNo1: res.data.rels[0].tradeNo,
				  sid: res.data.rels[0].goods.id
			  })
		  })
  },
  copy(){//复制微信
    wx.setClipboardData({
      data: this.esp,
      success: function (res) {

      }
    })
  },
  naviEps(){//跳转至订单
    wx.navigateTo({
      url: '../eps/eps?tradeNo=' + this.esp,
    })
  },
  eps2(tradeNo) {
	let data = ""; 
    let dat = {
      token: wx.getStorageSync('token'),
      tradeNo:tradeNo
    }
    apiModel.eps(dat)
      .then(res => {
		console.log("res",res)
        if(!res.data.content){
           data = ""
        }else{
          console.log(JSON.parse(res.data.content))
           data = JSON.parse(res.data.content)
        }
		console.log("data",data)
        this.setData({
          eps: data
        })
      })
  },
	goDetai(){//跳转至商品详情
		wx.navigateTo({
			url: '../goodsDetail/goodsDetail?id=' + this.data.sid
		})
		// console.log("/pages/")
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

  }

  /**
   * 用户点击右上角分享
   */
//   onShareAppMessage: function() {

//   }
})