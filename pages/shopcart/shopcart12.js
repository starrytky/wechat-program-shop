// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0,
    cartList: [],
    isCheckAll: false,
    newList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartData()
  },
  /**
   * 获取购物车列表
   */
  getCartData: function () {
    let that = this
    wx.request({
      url: 'http://ys.lumingx.com/api/miniapps/getCardList',
      data: {
        userId: 32976,
      },
      dataType: 'json',
      success: (result) => {
        console.log(result.data.data)
        that.setData({
          cartList: result.data.data
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  /**
   *  购物车全选，反选功能
   */
  checkAll: function () {
    //使用isCheckAll 标记是否全选
    let isCheckAll = !this.data.isCheckAll
    this.setData({
      isCheckAll: isCheckAll
    })

    let list = this.data.cartList;
    let totalAmount = 0
    list.forEach((item) => {
      if (isCheckAll) {
        item.isChecked = true
        totalAmount += item.SaleAmount * item.Quantity
      } else {
        item.isChecked = false
        totalAmount = 0
        this.data.newList = []
      }
    })
    this.setData({
      cartList: list,
      totalPrice: totalAmount
    })

    //使用新数组存储

  },

  /**
   * 检查部分
   * 1、点击复选框 查询isChecked是否为true
   */
  checkPart: function (e) {
    console.log('e.detail.value[0]',e.detail.value[0])
    let arr = this.data.newList
    if (e.detail.value[0]) {
      arr.push(e.detail.value[0]) 
    } else {
      arr.splice(arr.indexOf("" + e.detail.value[0]), 1)
    }
    console.log(arr)
    this.setData({
      newList: arr
    })

    let totalAmount = 0
    let list = this.data.cartList
    for (let i = 0; i < arr.length; i++) {
      totalAmount += list[arr[i]].SaleAmount * list[arr[i]].Quantity
    }
    this.setData({
      totalPrice: totalAmount
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
    this.getCartData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.data.newList = []
    this.data.totalPrice = 0
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