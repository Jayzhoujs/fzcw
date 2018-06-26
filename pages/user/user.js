const App = getApp()

Page({
  data: {
    userInfo: {},
    items: [
      {
        icon: '../../img/order.png',
        text: '我的订单',
        path: '/pages/order/list/index',
        prompt:'查看订单'
      },
      {
        icon: '../../img/address.png',
        text: '收货地址',
        path: '/pages/address/list/index'
      },
      {
        icon: '../../img/call.png',
        text: '联系客服',
        prompt: "18521708248",
      },
      {
        icon: '../../img/about.png',
        text: '关于我们',
        path: '/pages/about/index'
      }
      
    ],
    settings: [
      
    
    ]
  },
  onLoad() {
    this.getUserInfo()
    this.getStorageInfo()
  },
  navigateTo(e) {
    const index = e.currentTarget.dataset.index
    const path = e.currentTarget.dataset.path
    const prompt = e.currentTarget.dataset.prompt

    switch (index) {
      case 2:
        App.WxService.makePhoneCall({
          phoneNumber: prompt
        })
        break
      default:
        App.WxService.navigateTo(path)
    }
  },
  getUserInfo() {
    const userInfo = App.globalData.userInfo

    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
      return
    }

    App.getUserInfo()
      .then(data => {
        console.log(data)
        this.setData({
          userInfo: data
        })
      })
  },
  getStorageInfo() {
    App.WxService.getStorageInfo()
      .then(data => {
        console.log(data)
        this.setData({
          'settings[0].path': `${data.currentSize}KB`
        })
      })
  },
  // bindtap(e) {
  //   const index = e.currentTarget.dataset.index
  //   const path = e.currentTarget.dataset.path

  //   switch (index) {
  //     case 0:
  //       App.WxService.showModal({
  //         title: '友情提示',
  //         content: '确定要清除缓存吗？',
  //       })
  //         .then(data => data.confirm == 1 && App.WxService.clearStorage())
  //       break
  //     default:
  //       App.WxService.navigateTo(path)
  //   }
  // },
  logout() {
    App.WxService.showModal({
      title: '友情提示',
      content: '确定要登出吗？',
    })
      .then(data => data.confirm == 1 && this.signOut())
  },
  signOut() {
    App.HttpService.signOut()
      .then(res => {
        const data = res.data
        console.log(data)
        if (data.meta.code == 0) {
          App.WxService.removeStorageSync('token')
          App.WxService.redirectTo('/pages/login/index')
        }
      })
  },
})