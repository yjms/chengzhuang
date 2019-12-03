// pages/mytickets/mytickets.js
import {
	Api
} from '../../models/api.js'
const apiModel = new Api()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		currTab:1,//默认tab
		BASEIMG:"https://game.flyh5.cn/resources/game/wechat/yls/chengzhuang/",//图片基路径
		cardData:[],//优惠券列表
		isNodata:false,// 是否没有数据
		page:1,//默认第一页
		totlePage:10,//默认一页展示10跳数据
		isDown:false,//是否到底
		param:null,//跳转过是否带参数参数
		s_id:null,//商品id
		check:null,//选择哪张
		cardImg: [{ log: '', bg: 'q_card.png' }, { log: 'useed_log.png', bg: 'useed.png' }, { log: 'guoqi.png', bg:'guoqi_bg.png'}]//显示不同优惠券
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options);
		this.setData({ check:options.check,s_id:options})
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
		this.setData({ page: 1, cardData:[]})
		this.cardList();
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
	onReachBottom: function () {//上拉加载
		console.log(parseInt(this.data.page), parseInt(this.data.totlePage), parseInt(this.data.totlePage) - parseInt(this.data.page))
		if (!(parseInt(this.data.totlePage) - parseInt(this.data.page))>0)return;
		this.setData({ page:++this.data.page})
		this.cardList();
	},

	/**
	 * 用户点击右上角分享
	 */
	// onShareAppMessage: function () {

	// }
	changeTab(e){//查看不同类型的优惠券
		// this.getCard();
		// console.log(e.currentTarget.dataset.tab);
		this.setData({ currTab: e.currentTarget.dataset.tab, page: 1, cardData:[]})
		this.cardList();
	},
	cardList(){//获取优惠券列表
		let arr = [];
		let dat = {
			token: wx.getStorageSync('token'),
			status:this.data.currTab,
			page:this.data.page,
			limit:10,
		}
		apiModel.cardlist(dat).then((res)=>{
			console.log(res.code);
			// if(!res.code=="0000")return;
			console.log(1)
			for (let i = 0; i < res.data.records.length;i++){
				console.log(res.data.records[i].coupon.validityPeriod);
				res.data.records[i].coupon.validityPeriod = res.data.records[i].coupon.validityPeriod.split("~")[0].split(" ")[0] + "~" + res.data.records[i].coupon.validityPeriod.split("~")[1].split(" ")[0]
			}
			let arr = [...this.data.cardData, ...res.data.records];//this.data.cardData.contact(res.data.records);
			this.setData({ cardData: arr, isNodata: !arr.length > 0, totlePage: res.data.pages, isDown: this.data.page == this.data.totlePage && arr.length > 0})
			console.log(this.data.isNodata)
		})
	},
	// getCard(){
	// 	let dat = {
	// 		token: wx.getStorageSync('token')
	// 	}
	// 	apiModel.getCard(dat).then((res) => {
	// 		console.log(res);
	// 	})
	// },
	checkCard(e){//选择优惠券
		console.log(e);
		let cid = e.currentTarget.dataset.cid;
		let money = e.currentTarget.dataset.money;
		console.log(this.data.check,this.data.s_id)
		if(this.data.check=="check"&&this.data.currTab==1)
		if (this.data.s_id.jsonId){
			wx.redirectTo({
				url: `/pages/orderDetail/orderDetail?money=${money}&cid=${cid}&jsonId=${this.data.s_id.jsonId}`,
			})
		}else{
			wx.redirectTo({
				url: `/pages/orderDetail/orderDetail?money=${money}&cid=${cid}&id=${this.data.s_id.id}`,
			})
		}
		
	}
})