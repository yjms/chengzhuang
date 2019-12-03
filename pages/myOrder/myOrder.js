// pages/myOrder/myOrder.js


import {
  Api
} from '../../models/api.js'
const apiModel = new Api()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topData: [{//初始化订单列表tab
        title: '全部'
      },
      {
        title: '待付款'
      },
      {
        title: '待发货'
      },
      {
        title: '待收货'
      },
      {
        title: '已完成'
      },
    ],
    chooseIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  wxPay(e) {//支付
    let data = {
      token: wx.getStorageSync('token'),
      remark: e.currentTarget.dataset.item.msg,
      tradeNo: e.currentTarget.dataset.item.tradeNo,
      addressId: e.currentTarget.dataset.item.addressId
    }
    apiModel.wxPay(data)
      .then(res => {
        console.log(res)
        let appid = res.data.appid;
        let timeStamp = res.data.timeStamp;
        let nonceStr = res.data.nonceStr;
        let packages = res.data.package;
        let signType = 'MD5';
        let paySign = res.data.paySign;
        wx.requestPayment({
          timeStamp: timeStamp,
          nonceStr: nonceStr,
          package: packages,
          signType: 'MD5',
          paySign: paySign,
          success: function (res) {
            console.log(res)
            wx.redirectTo({
              url: '../myOrder/myOrder?chooseIndex=2'
            })
          },
          fail: function (res) {
            console.log(res)

          },
          complete: function (res) {
            console.log(res)
          }
        })
      })
  },

  navi43(e){
    console.log(e)
    // this.payArray.forEach(p => {
    //   idarr.push(p.id)
    // });
    // console.log(JSON.stringify(idarr))
    // let id = JSON.stringify(idarr)
    // wx.navigateTo({
    //   url: '../orderDetail/orderDetail?jsonId=' + id,
    // })
  },
  //点击跳转 订单详情页
  naviDetail(e) {//跳订单详情
    console.log(e)
    let id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '../myOrderSend/myOrderSend?id=' + id
    })
  },
  onLoad: function(options) {
    console.log(options)
    this.page = 1
    if (options.chooseIndex){
      let chooseIndex = parseInt(options.chooseIndex)
      this.getData(chooseIndex)
    }else{
      this.getData(this.data.chooseIndex)
    }

  },
  getData(cdata) {//获取订单数据
    console.log(cdata)
    let status = 0
    if (cdata === 0) {
      status = 0
    } else {
      status = cdata + 1
    }
    this.setData({
      chooseIndex: cdata
    })
    let data = {
      token: wx.getStorageSync('token'),
      page: this.page,
      limit: '10',
      status: status
    }
    apiModel.orderList(data)
      .then(res => {
        this.count = res.count
        if(this.page===1){
          console.log(res)
          this.setData({
            list: res.data
          })
        }else{
          this.setData({
            list: this.data.list.concat(res.data),
          })
        }
      })
  },
  cancelOrder(e){//取消订单
    // 
    let index = e.currentTarget.dataset.index
    console.log(e)
    let data = {
      tradeNo: e.currentTarget.dataset.item.tradeNo,
      token: wx.getStorageSync('token')
    }
    apiModel.cancelOrder(data)
      .then(res => {
        this.data.list.splice(index, 1)
        this.setData({
          list: this.data.list
        })
      })
  },
  choose(e) {//选择订单类型
    console.log(e)

    let index = e.currentTarget.dataset.index
    this.setData({
      chooseIndex: index
    })
    this.page = 1
    this.getData(index)
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
    if (this.data.list.length === this.count) {
      wx.showToast({
        title: '到底了~',
        icon: "none"
      })
    } else {
      this.page += 1
      this.getData(this.data.chooseIndex)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})