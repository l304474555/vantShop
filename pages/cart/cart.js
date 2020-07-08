// pages/cart/cart.js
import cart from '../../utils/cart'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[],
    allFlag: false,
    totolMoney: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getCard()
  },

  getCard(){
    cart.data.forEach(c=>{
      if( c._checked == undefined ){
        c._checked = false
      }
    })
    this.setData({
      cart: cart.data
    })
    this.changeTotalMoney()
  },
  onChange(e){
    let index = e.currentTarget.dataset.index || 0
    var dataName = 'cart[' + index + ']._checked'
    this.setData({
      [dataName]: !this.data.cart[index]._checked
    })
    this.changeTotalMoney()
  },
  allChange(e){
    var cart = this.data.cart
    var allFlag = e.detail
    cart.forEach(c=>{
      c._checked = allFlag
    })
    this.setData({ cart: cart, allFlag })
    this.changeTotalMoney()
  },
  changeTotalMoney(){
    var totolMoney = 0
    this.data.cart.forEach(c=>{
      c._checked && ( totolMoney += (c.Price*c._qty*100) )
    })
    this.setData({ totolMoney })

    cart.saveCart(this.data.cart)

    this.checkAllFlag()
  },
  checkAllFlag(){
    var allFlag = true
    this.data.cart.forEach(c=>{
      if(!c._checked){
        allFlag = false
      }
    })
    this.setData({
      allFlag
    })
  },

  changeItemQty(e){
    let index = e.currentTarget.dataset.index || 0
    let item = e.currentTarget.dataset.item
    let qty = e.detail
    this.data.cart[index]._qty = qty
    
    this.changeTotalMoney()
  },
  closeSwipe(e){
    const { position, instance } = e.detail;
    let item = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    switch (position) {
      case 'right':
        wx.$dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          instance.close();
          cart.del(item)
          this.del(item, index)
        });
        break;
    }
  },
  del(item, index){
    // this.data.cart.splice(index, 1)
    this.setData({
      cart: this.data.cart
    })
  },

  submit(){
    var hasGoods = this.checkHasGoods()
    hasGoods &&
    wx.navigateTo({
      url: '../createOrder/createOrder',
    }) ||
    wx.showToast({
      icon: 'none',
      title: '请选择商品',
    })
  },

  checkHasGoods(){
    let flag = false
    this.data.cart.forEach(c=>{
      if(c._checked){
        flag = true
      }
    })
    return flag
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