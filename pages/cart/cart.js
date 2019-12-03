// pages/cart/cart.js
const app = getApp();
import {
  Api
} from '../../models/api.js'
const apiModel = new Api()

Component({
  pageLifetimes: {
    show() {
	  console.log("cartcount", wx.getStorageSync('cartCount'))
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1,
          cartCount: wx.getStorageSync('cartCount')
        })
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    check: false, //商品是否已选择
    allcheck: false,
    totalPrice: 0,
    selected:1,
	hhh:'hello',
	cartCount: wx.getStorageSync('cartCount')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  methods: {

    navi21(e){
      let id = e.currentTarget.dataset.item.goods.id
      wx.navigateTo({
        url: '../goodsDetail/goodsDetail?id=' + id,
      })
    },
    // 去结算
    navi44() {
      if (this.payArray.length===0){
        wx.showToast({
          title: '请选择商品',
          icon:'none'
        })
        return
      }
      let idarr = []
      this.payArray.forEach(p => {
        idarr.push(p.id)
      });
      console.log(JSON.stringify(idarr))
      let id = JSON.stringify(idarr)
      wx.navigateTo({
        url: '../orderDetail/orderDetail?jsonId=' + id,
      })
    },
    //添加购物车
    addCart(id, quantity, goodsId) {
      let data = {
        token: wx.getStorageSync('token'),
        quantity: quantity,
        goodsId: goodsId,
        id: id
      }
      apiModel.addCart(data)
        .then(res => {
          console.log(res)
          if (res.msg === "SUCCESS") {
            this.getPrice()

          }
        })
    },
    //删除购物车商品
    del(e) {
      let id = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      let data = {
        token: wx.getStorageSync('token'),
        id: id
      }
      apiModel.delCart(data)
        .then(res => {
          console.log(res)
          if (res.msg === "SUCCESS") {
            this.data.detail.splice(index, 1)
            this.payArray = this.data.detail.filter(c => c.check === true)
            this.getPrice()
            var that = this;
            let data2 = {
              token: wx.getStorageSync('token'),
            }
            apiModel.cartCount(data2)
              .then(res => {
                wx.setStorageSync('cartCount', res.data)
                this.getTabBar().setData({
                  cartCount: res.data
                })
              })
              wx.showToast({
                title: '删除成功',
                icon: "none"
              })
			  console.log("数量", res.data)
              this.setData({
                detail: this.data.detail
              })
              this.onShow()
          }
        })
    },
    //单选逻辑
    checkFun(e) {
      let index = e.currentTarget.dataset.index
      console.log(this.data.detail) 
      console.log(index) 
      this.data.detail[index].check = !this.data.detail[index].check
      this.payArray = this.data.detail.filter(c => c.check === true)
      if (this.count === this.payArray.length) {
        this.data.allcheck = false
        this.checkFun2()
      }else{
          this.getPrice()
          console.log(this.data.detail[index].check)
          if (!this.data.detail[index].check) {
            this.setData({
              allcheck: false
            })
          }
          this.setData({
            detail: this.data.detail,
          })
      }
    },
    //全选逻辑
    checkFun2(e) {
      if (this.data.allcheck) {
        this.data.detail.forEach(p => {
          p.check = false
        });
      } else {
        this.data.detail.forEach(p => {
          p.check = true
        });
      }
      this.data.allcheck = !this.data.allcheck
      this.payArray = this.data.detail.filter(c => c.check === true) //选出购物车里面的数据
      this.setData({
        detail: this.data.detail,
        allcheck: this.data.allcheck
      })
      this.getPrice()
    },
    //获取价格
    getPrice() {
      let totalPrice = 0
      let singleGoodsPrice = 0
      this.payArray.forEach(p => {
        singleGoodsPrice = p.quantity * p.goods.price
        totalPrice += singleGoodsPrice
      });
      totalPrice = totalPrice.toFixed(2) //四舍五入两位小数
      this.setData({
        totalPrice: totalPrice  //总价格
      })
    },
    onLoad: function(options) {
      wx.setStorageSync('selected', '1')
    },
    //购物车数量+-
    countM(e) {
      this.payArray = this.data.detail.filter(c => c.check === true)
      this.setData({
        allcheck: this.data.allcheck
      })
      let type = e.currentTarget.dataset.type
      let index = e.currentTarget.dataset.index
      if (type == 1) {
        if (this.data.detail[index].quantity === 1) {
          return
        }
      }
      if (type == 2) {
        console.log(this.data.detail[index].quantity) 
        console.log(this.data.detail[index].goods.storeNum)

        if (this.data.detail[index].quantity >= this.data.detail[index].goods.storeNum) {
          wx.showToast({
            title: '库存不足',
            icon: 'none'
          })
          return
        }
      }
      if (type == 1) {
        this.data.detail[index].quantity -= 1 //商品-1
        this.setData({
          detail: this.data.detail
        })
      } else if (type == 2) {
        this.data.detail[index].quantity += 1 //商品+1
        this.setData({
          detail: this.data.detail
        })
      }
      let item = e.currentTarget.dataset.item
      this.addCart(item.id, this.data.detail[index].quantity, item.goods.id)

    },
    //获取购物车商品
    getList() {
      let data = {
        token: wx.getStorageSync('token'),
        page: this.page,
        limit: 10
      }
      apiModel.cartList(data)
        .then(res => {
          /*
          if (!this.data.allcheck) {
            //返回购物车数量
            this.count = res.count
            res.data.forEach(p => {
              p.check = false
            });
          }
          */
          //最开始页数为1 
          if (this.page == 1) {
            this.setData({
              detail: res.data
            })
            this.count = res.count
            this.data.allcheck = false  //默认全选
            this.checkFun2()
          } else {
            if (this.data.allcheck) {
              this.setData({
                detail: this.data.detail.concat(res.data),  //concat链接数组
              })
              this.data.allcheck = false
              this.checkFun2()
            } else {
              this.setData({
                detail: this.data.detail.concat(res.data),
              })
            }
          }
          //购物车数量不为空
          if(this.data.detail.length>0){
            this.data.allcheck = true  //默认全选
            this.payArray = this.data.detail.filter(c => c.check === true)
          }else{
            this.data.allcheck = false  //默认取消全选
          }
          this.setData({
            allcheck: this.data.allcheck
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
	  console.log("onshow", wx.getStorageSync('cartCount'))	
	  this.setData({ cartCount: wx.getStorageSync('cartCount')})
      this.page = 1
      this.getList()     //获取商品
	//   this.getcartNum();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function(){

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
      if (this.data.detail.length === this.count) {
        wx.showToast({
          title: '没有了~',
          icon: "none"
        })
      } else {
        this.page += 1
        this.getList()
      }


      // this.data.allcheck = true
      // this.checkFun2()


    },

    /**
     * 用户点击右上角分享
     */
    // onShareAppMessage: function() {
    // }
	//   getcartNum() {
	// 	  let data2 = {
	// 		  token: wx.getStorageSync("token"),
	// 	  }
	// 	  apiModel.cartCount(data2).then(res => {
	// 		  console.log(res.data, res.code);
	// 		  if (res.code == "0000")
	// 			  wx.setStorageSync('cartCount', res.data);
	// 		  //   if (typeof this.getTabBar === 'function' &&
	// 		  // 	  this.getTabBar()) {
	// 		  // 	  this.getTabBar().setData({
	// 		  // 		  selected: 0,
	// 		  // 		  cartCount: res.data
	// 		  // 	  })
	// 		  //   }
	// 	  })
	//   }
  },
})