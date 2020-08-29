// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0,
    cartList: [],
    checkCount: 0,
    isCheckAll: false
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
        that.setData({
          cartList: result.data.data
        })
      }
    })
  },
  /**
   *  购物车全选，反选功能
   */
  checkAll: function () {
    if (this.data.cartList.length === this.data.checkCount) {
      this.setData({isCheckAll:false})
      this.data.cartList.forEach(r => {
        r.isChecked = false
      })
    } else {
      this.setData({ischeckAll: true})
      this.data.cartList.forEach(r => {
        r.isChecked = true
      })
    }
    this.calcTotal()
    this.setData({
      cartList: this.data.cartList
    })
  },

  /**
   * 检查部分
   * 1、点击复选框 查询isChecked是否为true
   */
  checkPart: function (e) {
    let obj = this.data.cartList.find(r => r.Id === e.currentTarget.dataset.id)
    if (!obj.isChecked) { 
      obj.isChecked = true
      if(this.data.cartList.length === this.data.checkCount+1){
        this.setData({isCheckAll:true})
      }
    } else {
      obj.isChecked = false
      this.setData({isCheckAll:false})
    }
    this.setData({
      cartList: this.data.cartList
    })
    this.calcTotal()
  },

  /**
   * 计算价格
   */
  calcTotal: function () {
    let list = this.data.cartList
    let totalPrice = 0
    this.data.checkCount = 0
    list.forEach(item => {
      if (item.isChecked) {
        this.data.checkCount++
        totalPrice += item.SaleAmount * item.Quantity;
      }
    })
    this.setData({
      totalPrice: totalPrice,
      checkCount: this.data.checkCount
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
    // this.data.newList = []
    // this.data.totalPrice = 0
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