// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfo : {},
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetailInfo(options.goodsNo?options:{goodsNo:2562744})
  },
  /**
   * 获取商品详情页面数据接口
   * @param {GoodsNo: number} e 
   */
  getDetailInfo:function(options){
    let that = this
    wx.request({
      url: 'http://ys.lumingx.com/api/miniapps/getWXGoodsInfo',
      data: options,
      success: (result) => {
        if(result.data.success && result.data.data){
          that.setData({
            detailInfo: result.data.data
          })
        }
      }
    })
  },
  /**
   * 幻灯片切换事件
   */
  swiperChange: function(e){
    let swiperIndex = e.detail.current
    this.setData({
      current: swiperIndex
    })
  },
  /**
   * 跳转到首页
   */
  jumpToHome: function(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  /**
   * 电话咨询
   */
  onCall: function(){
    wx.makePhoneCall({
      phoneNumber: '10086',
    })
  },

  /**
   * 跳转到购物车
   */
  jumpToCart: function(){
    wx.switchTab({
      url: '/pages/shopcart/shopcart',
    })
  },
  /**
   * 加入购物车
   */
  addToCart:function(){
    let that = this
    wx.request({
      url: 'https://ys.lumingx.com/api/miniapps/addCart',
      data: {
        userId: '32976',
        quantity: 1,
        goodsId: that.data.detailInfo.GoodsNo
      },
      dataType: 'json',
      method: 'POST',
      success: (result) => {
        if(result.data && result.data.success){
          wx.showToast({
            title: '加入购物车成功',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  /**
   * 立即购买
   */
  btnBuy:function(){
    console.log("立即购买")
  },

  /**
   * 图片全屏预览功能
   */
  showImg:function (){
    wx.previewImage({
      urls: this.data.detailInfo.SwiperImgList,
      current: this.data.detailInfo.SwiperImgList[this.data.current],
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})