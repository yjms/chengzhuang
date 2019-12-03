//index.js
//获取应用实例
const app = getApp()
const regeneratorRuntime = require('../../utils/runtime.js');
const mta = require('../../utils/mta_analysis.js');
import {
  Api
} from '../../models/api.js'
const apiModel = new Api()
Component({
  pageLifetimes: {
    show(){
      this.getPostsList();
    }
  },
  data: {
    motto: 'Hello World',
    userInfo: {},//存用户信息
    hasUserInfo: false,//是否登录
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
	BASEIMG:"https://game.flyh5.cn/resources/game/wechat/yls/chengzhuang",//图片基路径
	coupon:false,//判断是否显示弹窗
	cardData:null,//优惠券弹窗数据
	page:1,//默认显示第一页
	totle:0,//总条数
	listData:[],//商品列表
	noMore:false,//有没有更多数据
  },
  methods: {
    //事件处理函数
    bindViewTap: function () {//跳转
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    onLoad: function (option) {
	  console.log(option.coupon);
	  if (option.coupon==1)
	  this.getCard();
	  this.setData({ coupon: option.coupon ? option.coupon:this.data.coupon});
      this.page = 1
      
      //获取banner图
		this.getbanner();
		mta.Page.init()//腾讯统计
    },
	onShow: function () {
		this.setData({ page: 1, listData:[]})
		this.getshopList();
	},
	getbanner(){//获取banner图
		apiModel.banner()
			.then(res => {
				console.log(res)
				this.setData({
					banner: res.data
				})
			})
	},
	getCard() {//领取优惠券
		  let dat = {
			  token: wx.getStorageSync('token')
		  }
		  apiModel.getCard(dat).then((res) => {
			  console.log(res);
			  if(res.code=='0000')
				this.setData({ cardData: res.data, coupon:true})
		  })
	},
	closePop(){//关闭优惠券弹窗
		wx.showToast({
			icon:"icon",
			title: '领取优惠券成功，赶紧去使用吧!',
		})
		this.setData({coupon:false})
	},
    navi(e) {//去商品详情
      console.log(e)
      let id = e.currentTarget.dataset.item.id
      wx.navigateTo({
        url: '../goodsDetail/goodsDetail?id=' + id,
      })
    },
	  onReachBottom: function () {//上拉加载更多
		  console.log(this.data.page, this.data.totle + 1)
		  if (this.data.page == (this.data.totle + 1)) {
			  this.setData({ noMore:true})
			//   wx.showToast({
			// 	  title: '到底了~',
			// 	  icon: "none"
			//   })
		  } else {
			  this.page += 1
			  this.getshopList()
		  }
	  },
	getshopList(){//商品列表
		let arr = this.data.listData;
		let data = {
			page: this.data.page,
			limit: 10
		}
		//获取商品列表
		apiModel.findList(data)
			.then(res => {
				console.log(res)
				arr = [...arr,...res.data];
				this.setData({
					listData: arr,
					totle: parseInt(res.count/10) 
				})
				console.log(this.data.totle)
			})
	},
	  onShareAppMessage: function () {
	  },
    getPostsList: async function () {
      //获取用户购物车数量 
      var that = this;
      let token=wx.getStorageSync('token')
      let data2 = {
        token: token,
      }
      if (token == 'undefined' || token==''){
        wx.login({
          success: res => {
            console.log(res)
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            let data = {
              code: res.code
            }
            apiModel.login(data)
              .then(res => {
                let token=res.data.token;
                wx.setStorageSync('token', token);
                let data2 = {
                  token: token,
                }
                  apiModel.cartCount(data2).then(res=>{
                  wx.setStorageSync('cartCount', res.data);
                  if (typeof this.getTabBar === 'function' &&
                    this.getTabBar()) {
                    this.getTabBar().setData({
                      selected: 0,
                      cartCount: res.data
                    })
                  }
                })
              })
          }
        })
      }else{
        let a = await apiModel.cartCount(data2);
        wx.setStorageSync('cartCount', a.data);
        if (typeof this.getTabBar === 'function' &&
          this.getTabBar()) {
          this.getTabBar().setData({
            selected: 0,
            cartCount: a.data
          })
        }

      }

    }    
  }
})