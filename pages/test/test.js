// pages/test/test.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		arr:[
			{txt:1,color:''},
			{ txt: 2, color: '' },
			{ txt: 3, color: '' },
			{ txt: 4, color: '' },
			{ txt: 5, color: '' }
			// { txt: 6, color: '' },
			// { txt: 7, color: '' },
			// { txt: 8, color: '' },
			// { txt: 9, color: '' },
			// { txt: 10, color: '' },
			// { txt: 11, color: '' },
			// { txt: 12, color: '' },
			// { txt: 13, color: '' }
			],
		curridx:-1,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.run();
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

	/**
	 * 用户点击右上角分享
	 */
	 run(){
		 let arr = this.data.arr;
		 for(let i = 0;i<arr.length;i++){
			 let r = Math.floor(Math.random() * 255);
			 let g = Math.floor(Math.random() * 255);
			 let b = Math.floor(Math.random() * 255);
			 let a = Math.random(); 
			 arr[i].color = `rgba(${r},${g},${b},${a})`
		 }
		 console.log(arr)
		 this.setData({arr:arr})
	 },
	changepor(e){
		this.run();
		this.setData({
			curridx:e.currentTarget.dataset.index
		})
		console.log(e.currentTarget.dataset.index)
	},
	closepop(){
		this.setData({
			curridx:-1
		})
	}
})