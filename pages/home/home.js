// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: [],
    pageNo: 1,
    pageSize: 10,
    isComplete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsData()
  },
  /**
   * 获取商品列表
   */
  getGoodsData: function () {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://ys.lumingx.com/api/manage/GoodsList', //仅为示例，并非真实的接口地址
      data: {
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        if (res.data.success && res.data.data.length > 0) {
          let newData = that.data.goodsData.concat(res.data.data)
          that.setData({goodsData: newData})
        }else {
          that.setData({isComplete: true})
        }
      }
    })
  },
  /**
   * 跳转到商品详情页
   */
  jumpDetail: function(e){
    // 点击商品获取当前商品数据(商品id)
    let goodsNo = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '/pages/detail/detail?goodsNo='+goodsNo,
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
    // console.log("1111")
    wx.showNavigationBarLoading()
    this.data.pageNo = 1
    this.setData({goodsData: []})
    this.getGoodsData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.pageNo++,
    this.getGoodsData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})