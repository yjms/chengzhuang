const app = getApp();
import {
  Api
} from '../models/api.js'
const apiModel = new Api()
Component({
  data: {
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    selected:"",
    cartCount:"",
    show:true,
    list: [
      {
      pagePath: "../index/index",
      iconPath: "../pages/imgs/a1.png",
      selectedIconPath: "../pages/imgs/a2.png",
      text: "首页"
    }, 
    {
      pagePath: "../cart/cart",
      iconPath: "../pages/imgs/a3.png",
      selectedIconPath: "../pages/imgs/a4.png",
      text: "购物车"
    },
    {
      pagePath: "../mine/mine",
      iconPath: "../pages/imgs/a5.png",
      selectedIconPath: "../pages/imgs/a6.png",
        text: "我的"
     }   
    
    ]
  },
  pageLifetimes: {
   show() {
        
    }
  },
  methods: {
    switchTab: function(e) {
		
      const data = e.currentTarget.dataset
      const url = data.path
		console.log(data.index)
	if (!wx.getStorageSync('userInfo').avatarUrl && data.index==1) {
		wx.navigateTo({
			url: '/pages/login/login'
		})
		return;
	}
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })

    },
    navi(e) {
      let index = e.currentTarget.dataset.index
      console.log(e)
      if (index === 0) {
        wx.navigateTo({
          url: '../address/address',
        })
      }
      if (index === 1) {
        wx.makePhoneCall({
          phoneNumber: '1231',
        })
      }
    },    
  }
})