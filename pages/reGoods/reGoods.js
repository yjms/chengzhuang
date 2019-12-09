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
		shopData:{},
		wlCode:'',
		wlData:null,
		BASEIMG: "https://game.flyh5.cn/resources/game/wechat/yls/chengzhuang",//图片基路径
	},

	/**
	 * 生命周期函数-- 
	 */
	onLoad: function (options) {
		console.log(options);
		console.log(JSON.parse(options.obj).status);
		this.setData({ shopData: JSON.parse(options.obj)});
		this.getaddress()
	},
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
	getval(e){
		this.setData({ wlCode:e.detail.value});
	},
	getaddress(e) {
		//获取商家地址
		let dat = {
			token: wx.getStorageSync('token'),
			sonTradeNo:this.data.shopData.itemNo
		}
		apiModel.tkaddress(dat).then((res)=>{
			if(res.code=="0000"){
				this.setData({ wlData:res.data})
			}
		})
	},
	fillCode(){
		// 填写物流单号
		let dat = {
			token: wx.getStorageSync('token'),
			sonTradeNo: this.data.shopData.itemNo,
			message:this.data.wlCode
		}
		apiModel.sendTheGoods(dat).then((res)=>{
			if(res.code=='0000'){
				wx.redirectTo({
					url: '/pages/myOrder/myOrder?chooseIndex=0',
				})
			}
		})
	},
	linkMan(){
		wx.navigateTo({
			url: '/pages/return/return'
		})
	},
	callphone(){
		wx.makePhoneCall({
			phoneNumber: '13670111017',
		})
	}
})
