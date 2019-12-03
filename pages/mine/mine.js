// pages/mine/mine.js
const app = getApp()
import {
  Api
} from '../../models/api.js'
const apiModel = new Api()
Component({
  pageLifetimes: {
    show() {
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    imgData: [{//初始化 列表
      imgs: '../imgs/m3.png',
      title: '待付款',
    }, {
      imgs: '../imgs/m2.png',
      title: '待发货'
    }, {
      imgs: '../imgs/m4.png',
      title: '待收货'
    }, {
      imgs: '../imgs/m8.png',
      title: '退款/售后'
    }],
    imgData2: [{
      imgs: '../imgs/m5.png',
      title: '收货地址',
      img2: '../imgs/2.png'
    }, {
      imgs: '../imgs/m6.png',
      title: '联系客服',
      img2: '../imgs/2.png'
    },
      {
        imgs: '../imgs/yh.png',
        title: '我的优惠劵',
        img2: '../imgs/2.png'
      }
    ],
    orderCount:"",
  },
  methods:{
      /**
       * 生命周期函数--监听页面加载
       */
      naviOrder() { // 跳转订单
		if (!wx.getStorageSync('userInfo').avatarUrl) {
			          wx.navigateTo({
				              url: '/pages/login/login'
			          })
			          return;
		}
        wx.navigateTo({
          url: '../myOrder/myOrder',
        })
      },
      onLoad: function(options) {
        this.setData({
          userInfo: app.globalData.userInfo
        })
        if (options.paySuc) {
          wx.navigateTo({
            url: '../chooseIndex/chooseIndex?=1',
          })
        }
      },
      navi2() {//跳登录
        wx.navigateTo({
          url: '../login/login',
        })
      },
      navi20(e) {//判断跳订单类型
		  if (!wx.getStorageSync('userInfo').avatarUrl) {
			  wx.navigateTo({
				  url: '/pages/login/login'
			  })
			  return;
		  }
        let index = e.currentTarget.dataset.index + 1
		let type = e.currentTarget.dataset.type;
		  console.log(index)
		 
		  if (index > 3 && type==1) {
          wx.navigateTo({
            url: '../return/return',
          })
		  } else if (index<=3) {
			  wx.navigateTo({
				  url: '../myOrder/myOrder?chooseIndex=' + index,
			  })
		  }
		else if(index>3&&type!=1){
			  wx.navigateTo({
				  url: '../myOrder/myOrder?chooseIndex=' + index,
			  })
		}

        
      },
      navi(e) {//我的页面的列表跳转
		  let index = e.currentTarget.dataset.index
		  console.log(index)
		  if (!wx.getStorageSync('userInfo').avatarUrl && index != 1) {
			wx.navigateTo({
				url: '/pages/login/login'
			})
			return;
		}
        console.log(e)
        if (index === 0) {
          wx.navigateTo({
            url: '../address/address',
          })
        }
        if (index === 1) {
          wx.makePhoneCall({
			  phoneNumber: '13670111017',
          })
        }
        if (index === 2) {
          wx.navigateTo({
            url: '../mytickets/mytickets',
          })
        }        
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
        this.setData({
          userInfo: app.globalData.userInfo
        })
        let data2 = {
          token: wx.getStorageSync('token')
        }
        let cartCount = wx.getStorageSync('cartCount')
        //数量取不到 toekn过期
        console.log(cartCount);
        if (cartCount === undefined || cartCount===""){
          console.log('1');
          apiModel.cartCount(data2).then(res => {
             wx.setStorageSync('cartCount', res.data);
             apiModel.orderCount(data2)
              .then(res2 => {
                this.setData({
                  orderCount: res2.data
                })
              })  
            if (typeof this.getTabBar === 'function' &&
              this.getTabBar()) {
              this.getTabBar().setData({
                selected: 2,
                cartCount: res.data
              })
            }
          })
        }else{

            apiModel.orderCount(data2)
              .then(res => {
                this.setData({
                  orderCount: res.data
                })
              })  

            if (typeof this.getTabBar === 'function' &&
              this.getTabBar()) {
              this.getTabBar().setData({
                selected: 2,
                cartCount: wx.getStorageSync('cartCount')
              })
            } 
        }    


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
  },     
})