// pages/category/category.js
const app = getApp();
Page({
  data: {
    mainActiveIndex:0,
    items:[
      { text: '所有城市' },
      { text: '所有城市22222222222' },
      { text: '所有城市3' },
      { text: '所有城市4' }
    ],
    goodsList:[{name:213},{name:213},{name:213},{name:213},{name:213}],

    skeletonLoading: {
      nav: true,
      list: true
    },
    scrollTop: 0
  },
  onLoad: function (options) {
    setTimeout(()=>{
      this.setData({
        ['skeletonLoading.nav']: false,
        ['skeletonLoading.list']: false
      })
    },2000)
  },
  onReady: function () {},
  onShow: function () {
    app.API.GetMenus().then(res=>{
      
    })

  },

  onClickNav(e){
    console.log(e)
    this.data.mainActiveIndex = e.detail.index
    this.data.goodsList.push({name:e.detail.index})
    this.setData({
      goodsList: this.data.goodsList,
      ['skeletonLoading.list']: true,
      scrollTop: 0
    })
    setTimeout(()=>{
      this.setData({
        ['skeletonLoading.list']: false
      })
    },1000)
  },

  loadList(){
    console.log(123)
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