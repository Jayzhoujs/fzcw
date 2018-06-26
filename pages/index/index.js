const App = getApp();

Page({
  data: {
    imgUrls: [
      '../../img/banner1.jpg',
      '../../img/banner2.jpg',
      '../../img/banner3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,     //切换间隔
    duration: 1000,      //动画时长

    activeIndex: 0,
    navList: [],
    goods: {},
    prompt: {
      hidden: !0,
    },
    classify: [] //就是navList
  },
  onLoad() {
    this.goods = App.HttpResource('/goods/:id', { id: '@id' })
    this.classify = App.HttpResource('/classify/:id', { id: '@id' })

    this.getClassify()
  },
  initData() {
    const type = this.data.goods.params && this.data.goods.params.type || ''
    const goods = {
      items: [],
      params: {
        page: 1,
        limit: 20,
        type: type,
      },
      paginate: {}
    }
    this.setData({
      goods: goods
    })
  },
  navigateTo(e) {
    //console.log(e)
    App.WxService.navigateTo('/pages/goods/detail/detail', {
      id: e.currentTarget.dataset.id
    })
  },
  getClassify() {
    const activeIndex = this.data.activeIndex

    this.classify.queryAsync({
      page: 1,
      limit: 4,
    })
      .then(res => {
        const data = res.data
        console.log(data)
        if (data.meta.code == 0) {
          this.setData({
            navList: data.data.items,
            //'goods.params.type':data.data.items[activeIndex]._id
          })
          this.onPullDownRefresh()
          //console.log(this.data)
        }
      })
  },
  getList() {
    const goods = this.data.goods
    const params = goods.params
    //console.log(params)
    this.goods.queryAsync(params)
      .then(res => {
        const data = res.data
        // const goodsList = this.data.navList
        //console.log(data)
        if (data.meta.code == 0) {
          data.data.items.forEach(n => n.thumb_url = App.renderImage(n.images[0] && n.images[0].path))
          goods.items = [...goods.items, ...data.data.items]
          goods.paginate = data.data.paginate
          goods.params.page = data.data.paginate.next
          goods.params.limit = data.data.paginate.perPage
          // for(var i=0;i<3;i++){
          //   goodsList[i].goods = goods
          // }
          this.setData({
            goods: goods,
            'prompt.hidden': goods.items.length
          })
          let nav = this.data.navList
          let list = this.data.goods.items
          //console.log(nav[0]._id)
          //console.log(list[0].types[0]._id)
          //console.log(list)
          // list.filter(item=>{
          //   return item.types[0]._id=nav[0]._id
          // }).map(item=>{
          //   return abc.push(item)
          // })
          let result = []
          for (let i = 0; i < nav.length; i++) {
            for(let j = 0;j<list.length;j++){
              if (nav[i]._id === list[j].types[0]._id) {
                result.push(list[j])
              }
            }
            nav[i].goods = result;
            result = []
          }
          this.setData({
            navList: nav
          })
          //console.log(this.data.navList)
        }
      })
  },
  onPullDownRefresh() {
    console.info('onPullDownRefresh')
    this.initData()
    //console.log(this)
    this.getList()
  },
  onReachBottom() {
    console.info('onReachBottom')
    if (!this.data.goods.paginate.hasNext) return
    this.getList()
  }
})
