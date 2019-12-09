// pages/applyth/applyth.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		BASEIMG: "https://game.flyh5.cn/resources/game/wechat/yls/chengzhuang",//图片基路径
		shopobj:{},
		shopData:{},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			shopobj:options.obj,
			shopData: JSON.parse(options.obj) 
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
	lookStatus(e){
		let txt = e.currentTarget.dataset.txt;
		let obj = JSON.parse(this.data.shopobj);
		obj.txt = e.currentTarget.dataset.txt;
		this.setData({ shopobj: JSON.stringify(obj)});
		wx.navigateTo({
			url: '/pages/shopstatus/shopstatus?obj=' + this.data.shopobj,
		})
	}
})