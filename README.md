# 开发中的问题

#### swiper的圆角问题
> 由于小程序的组件除了view外，大多不允许设置圆角
设置swiper-item为圆角

#### 省略号问题
css中设置
```
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
```

#### this指向问题
```
let that = this
request({
  url:'',
  success(res) {
    that.setData()
  }
})
```

#### 上拉触底加载
onReachBottom中叠加页数重新请求数据，使用concat叠加数组

#### 下拉刷新
1、json文件中修改 "enablePullDownRefresh":true
2、onPullDownRefresh函数中将页数和数据重置
3、在请求成功后添加wx.stopPullDownRefresh()，更快速关闭下拉刷新动画

#### 加载提示开启和关闭
1. wx.showNavigationBarLoading()开启加载提示
2. wx.hideNavigationBarLoading()隐藏加载提示

#### 点击事件&绑定数据
bindtap data-传递名="{{传递值}}"
currentTarget.dataset.传递名 = 传递值

#### 页面跳转且传值
wx.navgationTo()

# 商品详情页
#### 组件
1. image mode=""
2. view 和 text 区别 块级元素 行内块元素
3. ```<button open-type="share"></button>``` 触发用户转发

#### api
1. 大图预览 `previewImage` 全屏预览图片
2. `iconfont` 使用

# 购物车页面
#### 多选、全选、取消全选
1. 多选，在checkBox绑定data-id，找到对应的cartList，如果对应对象的obj.isChecked=undefined或为false设置为true,else设置为false。在data中设置checkCount，计算累计总数是否等于cartList.length-1,是则isCheckAll设置为true，否则设置为false，因为点击设置isChecked为true这一次没有加入到计算累计总数中，所以需要等于总数-1。
2. 取消全选，全选，全选按钮bindtap="checkAll",函数中如果cartList.length===checkCount则forEach设置为isCheck全为false否则全为true，同时将isCheckAll也进行更新。
3. 计算函数，cartList.forEach判断将具有isChecked：true的商品进行计算，且每次计算对checkCount++,得到当前计算的商品数，判断是否全选或者非全选