// pages/distribution/infoReg/infoReg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BASEIMG: "https://game.flyh5.cn/resources/game/wechat/yls/chengzhuang/",//图片基路径
	useName:'',//姓名
	usePhone:'',//联系方式
	useCard:'',//身份证号码
	zphone:"https://game.flyh5.cn/resources/game/wechat/yls/chengzhuang/upload.png",//身份证正面照
	fphone: "https://game.flyh5.cn/resources/game/wechat/yls/chengzhuang/upload.png",//身份证反面照
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
//   onShareAppMessage: function () {

//   }
	getVal(e){
		let type = e.currentTarget.dataset.type;
		let val = e.detail.value;
		let name = type==1?val:this.data.useName;
		let phone = type==2?val:this.data.usePhone;
		let card = type==3?val:this.data.useCard;
		this.setData({
			useName:name,
			usePhone:phone,
			useCard:card
		})
	},
	severInfo(){
		let name = this.data.useName;
		let phone = this.data.usePhone;
		let card = this.data.useCard;
		this.checkInfo(name,phone,card);
	},
	upFile(e){
		//文件上传
		let type = e.currentTarget.dataset.type;
		let that = this;
		wx.chooseImage({
			success(res) {
				const tempFilePaths = res.tempFilePaths
				wx.uploadFile({
					url: 'https://dev.flyh5.cn/shop/admin/upload', 
					filePath: tempFilePaths[0],
					name: 'file',
					formData: {
						'user': 'test'
					},
					success(res) {
						if(!res.code == "0000")return;
						const data = JSON.parse(res.data);
						console.log(data.data.src)
						that.setData({
							zphone: type == 1 ? data.data.src:that.data.zphone,
							fphone: type == 2 ? data.data.src:that.data.fphone
							})
					}
				})
			}
		})	
	},
	checkInfo(name,phone,card){
		let argu1 = name.replace(/\s+/g, "");
		let argu2 = phone.replace(/\s+/g, "");
		let argu3 = card.replace(/\s+/g, "");
		if(argu1!='' && argu2!='' && argu3 !=''){
			return true;
		}else{
			wx.showToast({
				icon:'none',
				title: '请把信息填写完整'
			})
			return false;
		}	
	}
})