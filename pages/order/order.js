var app = getApp()
var orderList = [
  {
    id: '1',
    orderId: '123123123123',
    name: '新公司注册',
    description: '新公司注册(四个刻章)',
    price: '39.60',
    num: '1',
    isPaid: true
  },
  {
    id: '2',
    orderId: '123412341234',
    name: '新公司注册',
    description: '新公司注册(四个刻章)',
    price: '39.60',
    num: '2',
    isPaid: false
  },
  {
    id: '3',
    orderId: '123451234512',
    name: '新公司注册',
    description: '新公司注册(四个刻章)',
    price: '39.60',
    num: '1',
    isPaid: true
  }
]

Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    orderList: orderList,
    unPaid: [],
    paid: []
  },
  onLoad: function () {
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          unPaid: orderList.filter((item) => !item.isPaid),
          paid: orderList.filter((item) => item.isPaid)
        });
      }
    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
}) 