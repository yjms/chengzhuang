// pages/addaddress/addaddress.js
import {
	Api
} from '../../models/api.js'
const apiModel = new Api()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// array: ['女', '男'],
		// gender: "请选择",//
		address: '请选择收货地址',//地址
		checked: 0,//不默认
		username: '',//用户名
		area: '',//详细地址
		region: ['广东省', '广州市', '海珠区'],//存地址
	},

	/**
	 * 生命周期函数--监听页面加载
	 */

	//设为默认
	switch1Change(e) {//选择是否默认
		console.log(e)
		if (e.detail.value === true) {
			this.data.checked = 1
		} else {
			this.data.checked = 0
		}
	},
	isPoneAvailable(pone) {//验证手机号
		var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
		if (!myreg.test(pone)) {
			return false;
		} else {
			return true;
		}
	},
	del2() {//删除收货地址
		let data = {
			token: wx.getStorageSync('token'),
			id: this.id
		}
		apiModel.deleteAddress(data)
			.then(res => {
				wx.hideLoading()
				console.log(res)
				wx.showToast({
					title: res.msg,
					icon: 'none'
				})
				wx.navigateBack({
					delta: 1
				})
			})

	},

	upload() {//提交 填写的信息并验证

		let addressData = {
			id: this.id,
			token: wx.getStorageSync('token'),
			name: this.data.username,
			phone: this.data.phone,
			address: this.data.region.toString(), //+ " " + (this.data.address.split(" ")[1] ? this.data.address.split(" ")[1] : this.data.address),
			addressDetail: this.data.area,
			isDefault: this.data.checked,
			// sex: this.data.sex
		}
		console.log(addressData)
		const val = this.isPoneAvailable(addressData.phone)
		if (this.data.username === '') {
			wx.showToast({
				title: '请填写姓名',
				icon: 'none',
				duration: 2000
			})
			return
		}
		// if (this.data.gender === '请选择') {
		// 	wx.showToast({
		// 		title: '请选择性别',
		// 		icon: 'none',
		// 		duration: 2000
		// 	})
		// 	return
		// }
		if (!val) {
			wx.showToast({
				title: '手机号码格式错误',
				icon: 'none',
				duration: 2000
			})
			return
		}
		// if (this.data.address === '请选择收货地址') {
		// 	wx.showToast({
		// 		title: '请选择收货地址',
		// 		icon: 'none',
		// 		duration: 2000
		// 	})
		// 	return
		// }

		if (this.data.area === '') {
			wx.showToast({
				title: '请填写详细地址',
				icon: 'none',
				duration: 2000
			})
			return
		}
		wx.showLoading({
			title: '请求中',
			mask: true
		})
		apiModel.addAddress(addressData)
			.then(res => {
				wx.hideLoading()
				console.log(res)
				wx.showToast({
					title: res.msg,
					icon: 'none'
				})
				wx.navigateBack({
					delta: 1
				})
			})
	},
	bindPickerChange(e) { //修改性别
		console.log(e)
		let index = e.detail.value
		this.setData({
			gender: this.data.array[index]
		})
		if (index == 0) {
			this.data.sex = 2
		} else if (index == 1) {
			this.data.sex = 1
		}
	},
	//省市区
	bindRegionChange: function (e) {//修改省市区
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			region: e.detail.value
		})
		/*
		let arr2="";
		for(var i = 0; i < this.data.region.length;i++){
		  arr2=arr2+this.data.region[i];
		}
		console.log(arr2);
		*/
	},
	onLoad: function (options) {
		console.log(options)
		// this.getCenterLocation()
		// console.log(options.id)
		if (options.id) {
			this.id = options.id
			this.initDel()//初始化
		}
	},
	initDel(){//初始化数据
		let data = {
			token: wx.getStorageSync('token'),
			id: this.id
		}
		apiModel.getoneaddress(data)
			.then(res => {
				let gender = ''
				if (res.data.sex == 1) {
					gender = '男'
					this.data.sex = 1
				} else {
					gender = '女'
					this.data.sex = 2
				}
				this.setData({
					username: res.data.name,
					phone: res.data.phone,
					name: res.data.address,
					address: res.data.address.split(" ")[1] ? res.data.address.split(" ")[1] : res.data.address,
					area: res.data.addressDetail,
					checked: res.data.isDefault,
					gender: gender,
					isS: true,
					region: res.data.address.split(" ")[0].split(",")
				})
			})
	},
	phone(e) {//手机号获取
		console.log(e)
		this.data.phone = e.detail.value
	},
	area(e) {//详细地址获取
		this.data.area = e.detail.value
	},
	userName(e) {//用户名获取
		console.log(e)
		this.data.username = e.detail.value
	},
	openConfirm: function () {//检测定位
		wx.showModal({
			content: '检测到您没打开定位权限，是否去设置打开？',
			confirmText: "确认",
			cancelText: "取消",
			success: function (res) {
				console.log(res);
				//点击“确认”时打开设置页面
				if (res.confirm) {
					console.log('用户点击确认')
					wx.openSetting({
						success: (res) => { }
					})
				} else {
					console.log('用户点击取消')
				}
			}
		});
	},
	getCenterLocation: function () {//获取定位信息并检测
		console.log(wx.getStorageSync('Location'))
		var that = this
		wx.getLocation({
			type: "gcj02",
			success: function (res) {
				that.locationData = res
			},fail(){
				wx.showToast({
					icon:"none",
					title: '为了用户体验，请开启微信位置服务和手机GPS!',
				})	
			}
		})
	},
	getLocationData() {//获取位置信息
		console.log(1212)
		wx.getSetting({
			success: (res) => {
				console.log(3)
				if (!res.authSetting['scope.userLocation'])
					that.openConfirm()
			}
		})
		var that = this
		console.log(that.locationData, !that.locationData);
		if (!that.locationData){
			that.getCenterLocation();
			return;
		} 
		wx.chooseLocation({//选择位置
			latitude: that.locationData.latitude,
			longitude: that.locationData.longitude,
			scale: 18,
			success: function (res) {
				console.log(res)
				that.data.address = res.address
				that.setData({
					address: res.address
				})
			}
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
		// if (!this.locationData)
		// this.getCenterLocation();
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

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})