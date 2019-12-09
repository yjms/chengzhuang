import {
  HTTP
}
from '../utils/http-p.js'

class Api extends HTTP {
  login(data) {//登录接口调用
    return this.request({
      url: 'wx/wxLogin',
      method: 'POST',
      data: data
    })
  }
  getUserInfo(data) {//获取用户信息
    return this.request({
      url: 'wx/getUserInfo',
      method: 'POST',
      data: data
    })
  }
  eps(data) {//查询物流信息
    return this.request({
      url: 'api/exp/findExp',
      method: 'POST',
      data: data
    })
  }
  findList(data) {//获取商品列表
    return this.request({
      url: 'api/goods/findList',
      method: 'POST',
      data: data
    })
  }
  findDetail(data){//查询商品列表
    return this.request({
      url: 'api/goods/findDetail',
      method: 'POST',
      data: data
    })
  }
  cartList(data) {//获取购物车列表
    return this.request({
      url: 'api/cart/findList',
      method: 'POST',
      data: data
    })
  }
  addCart(data) {//添加、修改购物车
    return this.request({
      url: 'api/cart/addCart',
      method: 'POST',
      data: data
    })
  }
  delCart(data) {//删除购物车
    return this.request({
      url: 'api/cart/deleteCart',
      method: 'POST',
      data: data
    })
  }
  getaddress(data) {//收货地址列表
    return this.request({
      url: 'api/address/findList',
      method: 'POST',
      data: data
    })
  }
  getoneaddress(data) {//收货地址详情
    return this.request({
      url: 'api/address/findDetail',
      method: 'POST',
      data: data
    })
  }
	addAddress(data) {//新增/修改收获地址
    return this.request({
      url: 'api/address/addAddress',
      method: 'POST',
      data: data
    })
  }
//   deleteAddress(data) {//删除地址
//     return this.request({
//       url: 'api/address/deleteAddress',
//       method: 'POST',
//       data: data
//     })
//   }
	deleteAddress(data) {//删除收货地址
    return this.request({
      url: 'api/address/deleteAddress',
      method: 'POST',
      data: data
    })
  }
  orderList(data) {//获取订单列表
    return this.request({
      url: 'api/order/findList',
      method: 'POST',
      data: data
    })
  }
  wxPay(data) {//支付接口调用 
    return this.request({
      url: 'api/pay/wxPay',
      method: 'POST',
      data: data
    })
  }

  buyNow(data) {//立即购买
    return this.request({
      url: 'api/order/buyNow',
      method: 'POST',
      data: data
    })
  }
	settle(data) {//结算，在购物车页面点击结算调用
    return this.request({
      url: 'api/order/settle',
      method: 'POST',
      data: data
    })
  }
  orderDetail(data) {//订单详情
    return this.request({
      url: 'api/order/findDetail',
      method: 'POST',
      data: data
    })
  }
	banner() {//获取banner图
    return this.request({
      url: 'api/banner',
      method: 'POST',
      data: ''
    })
  }
  cancelOrder(data) {//取消订单
    return this.request({
      url: 'api/order/cancelOrder',
      method: 'POST',
      data: data
    })
  }
	cartCount(data) {//获取购物车数量
      return this.request({
        url: 'api/cart/cartCount',
        method: 'POST',
        data: data
      })    
  }
	orderCount(data) { //获取订单数量
    return this.request({
      url: 'api/order/orderCount',
      method: 'POST',
      data: data
    })
  }
  cardlist(data) {//查询优惠券列表
		return this.request({
			url: 'api/coupon/findList',
			method: 'POST',
			data: data
		})
  }
  getCard(data){//领取优惠券
	  return this.request({
		  url: 'api/coupon/receiveCoupon',
		  method: 'POST',
		  data: data
	  })
  }   
  applytk(data) {//申请退款
	return this.request({
		url: 'api/pay/wxRefund',
		method: 'POST',
		data: data
	})
}
tkaddress(data) {//查询退货地址
	return this.request({
		url: 'api/order/refundAddress',
		method: 'POST',
		data: data
	})
}
sendTheGoods(data) {//填写退货物流单号
	return this.request({
		url: 'api/order/sendTheGoods',
		method: 'POST',
		data: data
	})
}
comfigshop(data) {//确认收货
	return this.request({
		url: 'api/order/confirmReceipt',
		method: 'POST',
		data: data
	})
}
findRefundList(data) {//查询退款订单
	return this.request({
		url: 'api/order/findRefundList',
		method: 'POST',
		data: data
	})
}
}

export {
  Api
}