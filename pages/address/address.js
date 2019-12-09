// pages/address/address.js
import {
  Api
} from '../../models/api.js'
const apiModel = new Api()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  BASEIMG: "https://game.flyh5.cn/resources/game/wechat/yls/chengzhuang/",//图片基路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },
  //添加新地址
  navi() {//跳转添加新地址
    wx.navigateTo({
      url: '../addaddress/addaddress',
    })
  },
 
  navi2(e){//点击整行编辑
    console.log(e)
    let id = e.currentTarget.dataset.item.id
    console.log(id)
    wx.navigateTo({
      url: '../addaddress/addaddress?id=' + id,
    })
  },
  // checkRadio(e) {
  //   console.log(e)
  //   let index = e.currentTarget.dataset.index
  //   this.data.list[index].check = !this.data.list[index].check
  //   this.setData({
  //     list: this.data.list
  //   })
  // },
  getAddress() {//获取地址列表
    let data = {
      token: wx.getStorageSync('token')
    }
    apiModel.getaddress(data)
      .then(res => {
        console.log(res)
        // res.data.forEach(p => {
        //   p.check = false
        // });
        this.setData({
          list: res.data
        })
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
    this.getAddress()
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