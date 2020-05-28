// pages/category/category.js
import cart from '../../utils/cart'
const app = getApp();
Page({
  data: {
    mainActiveIndex:0, //当前菜单下标
    menulist:[], //菜单
    goodsList:[], //商品
    parm:{
      searchKey: '',
      pageIndex: 1,
      pageSize: 10
    },

    skeletonLoading: { //骨架屏
      nav: true,
      list: true
    },
    scrollTop: 0 //页面滑动高度
  },
  onLoad: function (options) {
    this.GetMenus() //获取菜单
    console.log(cart)
  
  },
  onReady: function () {},
  onShow: function () {
    
  },
  //获取菜单
  GetMenus(){
    app.API.GetMenus().then(res=>{
      if(res.State == 1){
        this.data.menulist = res.Result && res.Result.data
        this.rendMenuList()
        this.getPageHome() //获取商品
      }
    })
  },
  rendMenuList(){
    this.data.menulist.forEach(item =>{
      item.text = item.MenuName
    })
    this.setData({
      ['skeletonLoading.nav']: false,
      menulist: this.data.menulist
    })
  },
  //获取商品
  getPageHome(){
    if(!this.data.menulist.length){ return }
    let menulist = this.data.menulist, mainActiveIndex = this.data.mainActiveIndex;
    let arg = menulist[mainActiveIndex] && menulist[mainActiveIndex].Id
    app.API.GetPageHome({ Id: arg }).then(res=>{
      console.log(res)
      let isLoading = false;
      if(res.State == 1){

        isLoading = (res.Result.length < this.data.parm.pageSize) ? false: true ;

        (this.data.parm.pageIndex == 1) 
        && (this.data.goodsList = res.Result) 
        || (this.data.goodsList = [...this.data.goodsList, ...res.Result])
        
      }
      
      this.setData({
        goodsList: this.data.goodsList,
        ['skeletonLoading.list']: false,
        ['skeletonLoading.loading']:isLoading
      })
    }, err=>{
      this.setData({
        ['skeletonLoading.list']: false
      })
    })
  },
  //点击菜单
  onClickNav(e){
    console.log(e)
    this.data.mainActiveIndex = e.detail.index
    this.data.activeNavItem = e.detail.item
    this.setData({
      ['skeletonLoading.list']: true,
      scrollTop: 0
    })
    this.data.parm.pageIndex = 1

    this.getPageHome()
  },

  addCart(e){
    console.log(e)
    let item  = e.currentTarget.dataset.item
    cart.add(item)
    wx.$toast.success('商品添加成功');
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