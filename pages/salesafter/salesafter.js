// pages/salesafter/salesafter.js
const app = getApp();
import {
	Api
} from '../../models/api.js'
const apiModel = new Api();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		BASEIMG: "https://game.flyh5.cn/resources/game/wechat/yls/chengzhuang",//图片基路径
		orderData:[],
		scount:0,
		page:1,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.orderlist();
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
		if(this.data.orderData.length<this.data.scount){
			this.setData({page:++this.data.page})
			this.orderlist();
		}
		
	},
	orderlist(){
		let arr = this.data.orderData;
		let dat = {
			token:wx.getStorageSync('token'),
			page:this.data.page
		}
		apiModel.findRefundList(dat).then((res)=>{
			if(res.code=='0000'){
				arr = arr.concat(res.data);
				this.setData({ orderData: arr,scount:res.count})
			}
			console.log(res);
		})
	},
	lookdel(e){
		let obj = {};
		obj.id = e.currentTarget.dataset.obj.goods.id;
		obj.name = e.currentTarget.dataset.obj.goodsName;
		obj.img = e.currentTarget.dataset.obj.mainPathImg;
		obj.description = e.currentTarget.dataset.obj.goods.description;
		obj.price = e.currentTarget.dataset.obj.totalPrice;
		obj.num = e.currentTarget.dataset.obj.quantity;
		obj.tradeNo = e.currentTarget.dataset.obj.firstTradeNo;
		obj.itemNo = e.currentTarget.dataset.obj.tradeNo;
		obj.status = e.currentTarget.dataset.obj.status;
		// console.log(obj)
		// return;
		wx.navigateTo({
			url: '/pages/reGoods/reGoods?obj=' + JSON.stringify(obj) 
		})
	}
	// onShareAppMessage: function () {

	// }
})