// pages/applyth/applyth.js
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
		shopData:{},
		_status:false,//货物状态弹窗
		_reason:false,//退货原因弹窗
		_snum:0,
		_rnum:[],
		_rtxt: [{ txt: '拍错/多拍/不想要',bol:false},
				{ txt: '7天无理由退换货',bol:false},
				{ txt: '商品与实物不符合',bol:false},
				{ txt: '做工问题',bol:false},
				{ txt: '材质面料与商品描述不符合', bol: false }],
		tkTxt:"",//退款文字
		tkimg:'https://game.flyh5.cn/resources/game/wechat/yls/chengzhuang/photoimg.png',//凭证图
		tkreason:'请选择',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		this.setData({ shopData: JSON.parse(options.obj)})
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
	checkstatus(){//选择货物状态
		this.setData({_status:true});
	},
	checkreason(){
		this.setData({ _reason: true });
	},
	closePop(e){
		let num = e.currentTarget.dataset.num;
		this.setData({ _status:false,_reason:false})
		if(!num==2)return;
		let str = '';
		for (let i = 0; i < this.data._rtxt.length; i++) {
			if (this.data._rtxt[i].bol) {
				str += i == 0?(this.data._rtxt[i].txt) : (',' + this.data._rtxt[i].txt);
			}
		}
		if(str!=''){
			this.setData({ tkreason: str })
		}else{
			this.setData({ tkreason: '请选择' })
		}
		
	},
	select(e){
		this.setData({ _snum: e.currentTarget.dataset.num})
	},
	_selects(e){
		//多选
		let arr = this.data._rtxt;
		console.log(e.currentTarget.dataset.num);
		let num = e.currentTarget.dataset.num;
		arr[num].bol = !arr[num].bol;
		this.setData({_rtxt:arr});
	},
	getval(e){
		console.log(e)
		this.setData({tkTxt:e.detail.value});
	},
	submit(){
		let obj = this.data.shopData;
		let dat = {
			token: wx.getStorageSync('token'),
			refundType: obj.txt,
			tradeNo: obj.tradeNo,
			sonTradeNo: obj.itemNo,
			cargoStatus:this.data._snum==1?'未收到货':'已收到货',
			refundCause: this.data.tkreason,
			refundState: this.data.tkTxt,
			img: this.data.tkimg
		}
		console.log(dat);
		apiModel.applytk(dat).then((res)=>{
			if(res.code=='0000'){
				wx.showToast({
					icon:'none',
					title: '申请退款成功!'
				})
				wx.redirectTo({
					url: '/pages/myOrder/myOrder?chooseIndex=0',
				})
			}else{
				wx.showToast({
					icon: 'none',
					title: res.msg
				})
			}
		})		
	},
	upImage(){
		let that = this;
		wx.chooseImage({
			success(res) {
				const tempFilePaths = res.tempFilePaths
				wx.uploadFile({
					url: 'https://dev.flyh5.cn/shop/admin/upload', //仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					name: 'file',
					formData: {
						'user': 'test'
					},
					success(res) {
						const data = JSON.parse(res.data); 
						console.log(data)
						that.setData({ tkimg: data.data.src})
					}
				})
			}
		})
	}
})