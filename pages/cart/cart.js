// pages/cart/cart.js
import cart from '../../utils/cart'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[],
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
    this.setData({
      cart: cart.data
    })
  },
  changeItemQty(e){
    let index = e.currentTarget.dataset.index || 0
    let item = e.currentTarget.dataset.item
    let qty = e.detail
    this.data.cart[index]._qty = qty
    cart.changeItemQty(item, qty)
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