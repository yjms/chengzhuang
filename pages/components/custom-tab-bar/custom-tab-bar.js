const app = getApp();
import {
  Api
} from '../../../models/api.js'
const apiModel = new Api()
Component({
  data: {
    color: "#7A7E83",
    selectedColor: "#4B5248",
    selected2:"",
  },
  properties: {
    selected: {
      type: Number
    }
  },
  attached() {//获取购物车数量
    var that = this;
    console.log(this.properties.selected);
    let data2 = {
      token: wx.getStorageSync('token'),
    }
    apiModel.cartCount(data2)
      .then(res => {
        app.globalData.cartCount = res.data
        that.setData({
          cartCount: app.globalData.cartCount,
          selected2: this.properties.selected
        })
        that.setData({
          list: [
            { "pagePath": "/pages/index/index", "iconPath": "/pages/imgs/a1.png", "selectedIconPath": "/pages/imgs/a2.png", "text": "首页" },
            { "pagePath": "/pages/cart/cart", "iconPath": "/pages/imgs/a3.png", "selectedIconPath": "/pages/imgs/a4.png", "text": "购物车" },
            { "pagePath": "/pages/mine/mine", "iconPath": "/pages/imgs/a5.png", "selectedIconPath": "/pages/imgs/a6.png", "text": "我的" },
          ],
        })
      })
  },
  methods: {
    switchTab(e) {//tab切换
      console.log(e);
      var data = e.currentTarget.dataset.id
      var url = e.currentTarget.dataset.path;
      app.globalData.selected = data       //把本页面需要传递的参数保存在全局上
      console.log(data);
      console.log(url);
      wx.switchTab({
        url: url,
      })
      var that = this;
    },
    navigateTab(e) {
      var data = e.currentTarget.dataset.id
      var url = e.currentTarget.dataset.path;
      app.globalData.selected = data       //把本页面需要传递的参数保存在全局上
      console.log(data);
      console.log(url);
      wx.navigateTo({
        url: url + '&selected=' + data
      })
    },
    dianpu: function (e) {
      var that = this;
      console.log(e);
      app.wxRequset({
        url: this.data.NEW_INDEX,
        data: {
          id: e.currentTarget.dataset.id
        },
        success: function (res) {
          if (res.data.status == 1) {
            that.triggerEvent('myevent', res.data.data.items)

          }
          /* 2.请求成功、返回数据失败 */
          app.setPageShow(that);// by Molly
        },
        fail: function (res) {
          /* 3.请求失败 */
          app.setPageShow(that);// by Molly
          wx.showToast({ title: "请求失败，请重试", icon: "none" })
        }
      });

    },
  }

})

