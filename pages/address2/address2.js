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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  navi(e) {
    console.log(e);
    let id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '../addaddress/addaddress?id=' + id,
    })
  },
  navi3(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.item.id
    var pages = getCurrentPages();   //当前页面
    var prevPage = pages[pages.length - 2];   //上一页面
    prevPage.setData({
      id: id, 
      addid:index
    });

    wx.navigateBack({
      delta: 1
    })
  },
  navi2(){
    wx.navigateTo({
      url: '../addaddress/addaddress',
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
  getAddress() {
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAddress()
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