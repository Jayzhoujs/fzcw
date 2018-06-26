const App = getApp()

Page({
  data: {
    indicatorDots: !0,
    vertical: !1,
    autoplay: !1,
    interval: 3000,
    duration: 1000,
    current: 0,
    goods: {
      item: {}
    },
    communication: [
      {
        title: "总部联系方式",
        tel1: "18980095621（黄先生）",
        tel2: "15202835520（李经理）",
        tel3: "028-86657756（办）",
        address: "成都市青羊区鼓楼南街117号世界贸易中心A座1006室"
      },
      {
        title: "青阳分部联系方式",
        tel1: "18980664471（雷经理）",
        tel2: "13438044601",
        tel3: "028-86657756（办）",
        address: "成都市青羊区鼓楼南街117号世界贸易中心A座1006室"
      },
      {
        title: "金牛分部联系方式",
        tel1: "17313024515（黄经理）",
        tel2: "15228893670",
        tel3: "028-61360596（办）",
        address: "成都市金牛区金府路593号金府银座8栋C座710室"
      },
      {
        title: "新都分部联系方式",
        tel1: "18113121518（杜经理）",
        tel2: "13568817922",
        tel3: "028-89346331（办）",
        address: "成都市新都区蓉都大道南四段119号华都九龙广场1栋1单元10楼1011号"
      },
      {
        title: "武侯分部联系方式",
        tel1: "17313024178（钟经理）",
        tel2: "15982366965",
        tel3: "028-62300859（办）",
        address: "成都市武侯区武侯大道顺江段77号汇点广场3座810室"
      },
      {
        title: "高新分部联系方式",
        tel1: "18908039394（钟经理）",
        tel2: "13982242976",
        tel3: "028-87492101（办）",
        address: "成都市高新区天府五街200号6栋A区2楼"
      }
    ]
  },
  swiperchange(e) {
    this.setData({
      current: e.detail.current,
    })
  },
  onLoad(option) {
    this.goods = App.HttpResource('/goods/:id', { id: '@id' })
    this.setData({
      id: option.id
    })
  },
  onShow() {
    this.getDetail(this.data.id)
  },
  addCart(e) {
    const goods = this.data.goods.item._id
    App.HttpService.addCartByUser(goods)
      .then(res => {
        const data = res.data
        console.log(data)
        if (data.meta.code == 0) {
          this.showToast(data.meta.message)
        }
      })
  },
  bug(e){
    const goods = this.data.goods.items._id
  },
  previewImage(e) {
    const urls = this.data.goods && this.data.goods.item.images.map(n => n.path)
    const index = e.currentTarget.dataset.index
    const current = urls[Number(index)]

    App.WxService.previewImage({
      current: current,
      urls: urls,
    })
  },
  showToast(message) {
    App.WxService.showToast({
      title: message,
      icon: 'success',
      duration: 1500,
    })
  },
  getDetail(id) {
    // App.HttpService.getDetail(id)
    this.goods.getAsync({ id: id })
      .then(res => {
        const data = res.data
        console.log(data)
        if (data.meta.code == 0) {
          data.data.images.forEach(n => n.path = App.renderImage(n.path))
          this.setData({
            'goods.item': data.data,
            total: data.data.images.length,
          })
        }
        console.log(this.data.goods)
      })
  },
  toIndex(){
    App.WxService.switchTab('/pages/index/index')
  },
  toCarts(){
    App.WxService.switchTab('/pages/carts/carts')
  }
})