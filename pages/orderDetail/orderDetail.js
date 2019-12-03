// pages/orderDetail/orderDetail.js
import {
  Api
} from '../../models/api.js'
const apiModel = new Api()
import {
  config
} from '../../config.js'
const md5 = require('../md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addid: 0, //地址索引
	s_id:null,//商品id
	yh_money:null,//优惠券金额
	yh_id:null,//优惠券id
	options:null,//接受跳转过来的参数
  },

  /**
   * 生命周期函数--监听页面加载
   */

  //提交订单
  wxPay() {
	let price = this.data.yh_money ? (this.data.payData.totalPrice - this.data.yh_money >= 0 ? this.data.payData.totalPrice - this.data.yh_money : 0) : this.data.payData.totalPrice;
	let that = this;
    console.log("提交价格",price);
	if(this.data.list.length=='0'){
      wx.showToast({
        title: '请添加地址',
        icon:'none'
      }) 
    }else{
	  let dat = {};
	  if (this.data.yh_id){
		   dat = {
			  token: wx.getStorageSync('token'),
			  remark: this.remark,
			  tradeNo: this.data.payData.tradeNo,
			  addressId: this.data.list[this.data.addid].id,
			  couponId:this.data.yh_id,
		  } 
	  }else{
		   dat = {
			  token: wx.getStorageSync('token'),
			  remark: this.remark,
			  tradeNo: this.data.payData.tradeNo,
			  addressId: this.data.list[this.data.addid].id
		  }
	  }
      apiModel.wxPay(dat)
        .then(res => {
          console.log(res)
			that.getcartNum();
		  if(res.code=="2000"){
			  wx.redirectTo({
				  url: '../myOrder/myOrder?chooseIndex=2'
			  })
			  
			  return;
		  }
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
				wx.redirectTo({
					url: '../myOrder/myOrder?chooseIndex=1'
				})
            },
            complete: function (res) {
              console.log(res)
            }
          })
        })
    }

  },
  getcartNum(){//获取购物车数量
	  let data2 = {
		  token: wx.getStorageSync("token"),
	  }
	  apiModel.cartCount(data2).then(res => {
		  console.log(res.data,res.code);
		  if(res.code=="0000")
		  wx.setStorageSync('cartCount', res.data);
		//   if (typeof this.getTabBar === 'function' &&
		// 	  this.getTabBar()) {
		// 	  this.getTabBar().setData({
		// 		  selected: 0,
		// 		  cartCount: res.data
		// 	  })
		//   }
	  })
  },
  getTextareaInput(e) {//获取输入内容
    this.remark = e.detail.value
  },
  naviAdd(e) {//跳转
    let id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '../address2/address2',
    })
  },
  naviAdd2(e) {
    wx.navigateTo({
      url: '../address2/address2'
    })
  },
  onLoad: function(options) {
	console.log("options",options)
	  this.setData({
		  		   s_id: options,
				   yh_money: options.money ? options.money:this.data.yh_money,
				   yh_id:options.cid?options.cid:this.data.yh_id
		        });
    this.remark = ''
    if (options.id) {
      this.buyNow(options.id)
    } else if (options.jsonId) {
      this.settle(options.jsonId)
    }
  },
  settle(id) {
    let data = {
      token: wx.getStorageSync('token'),
      cartIds: id
    }
    apiModel.settle(data)
      .then(res => {
        console.log(res)
        this.setData({
          payData: res.data
        })
      })
  },
  //   购买
  buyNow(id) {
    let data = {
      token: wx.getStorageSync('token'),
      quantity: 1,
      goodsId: id
    }
    apiModel.buyNow(data)
      .then(res => {
        console.log(res)
        this.setData({
          payData: res.data
        })
      })
  },
  //获取收获地址
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
	console.log(this.cut(1.01,1));
    this.getAddress()

    let pages = getCurrentPages(); // 获取当前页面栈
    console.log(pages);
    let currPage = pages[pages.length - 1];  //-1是当前页  -2是上一页 
    //addid默认为0
    if (currPage.data.addid) {

      this.setData({

        //将携带的参数赋值

        addressId: currPage.data.id,
        addid: currPage.data.addid  //地址索引

      });
    }
    console.log(this.data.addid) //地址索引
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
//   onShareAppMessage: function() {

//   }
	checkCard(){
		console.log("s_id",this.data.s_id)
		if(this.data.s_id.jsonId){
			wx.navigateTo({
				url: `/pages/mytickets/mytickets?check=check&jsonId=${this.data.s_id.jsonId}`,
			})
		}else{
			wx.navigateTo({
				url: `/pages/mytickets/mytickets?check=check&id=${this.data.s_id.id}`,
			})
		}
		
	},
 cut(arg1, arg2) {
		var r1, r2, m, n;
		try { r1 = arg1.toString().split(".")[1].length } catch(e) { r1 = 0 }
		try { r2 = arg2.toString().split(".")[1].length } catch(e) { r2 = 0 }
		m = Math.pow(10, Math.max(r1, r2));
			n = (r1 >= r2) ? r1 : r2;
		return((arg1 * m - arg2 * m) / m).toFixed(n);
}
})