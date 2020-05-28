let cart = {
  timer: null,
  data: wx.getStorageSync('cart') || [],
  add(item){
    item._qty = 1
    this.checkAndAddItem(item) ? false : this.data.push(item)
    this.debounce(this.setCart, 1000)()
  },
  del(item){
    this.data.forEach((d, index)=>{
      if(d.Id == item.Id){
        this.data.splice(index, 1)
      }
    })
    this.debounce(this.setCart, 1000)()
  },
  checkAndAddItem(item){
    let flag = false;
    this.data.forEach(d=>{
      if(d.Id == item.Id){
        flag = true
        d._qty&&d._qty++ || (d._qty=1)
      }
    })
    return flag
  },
  changeItemQty(item, qty){
    this.data.forEach(d=>{
      if(d.Id == item.Id){
        d._qty = qty
      }
    })
    this.debounce(this.setCart, 1000)()
  },
  setCart(){
    wx.setStorageSync('cart', this.data)
    console.log(this.data)
  },
  
  debounce(func, wait) {
      let that = this;
      return function() {
        let context = this; // 注意 this 指向
        let args = arguments; // arguments中存着e
        if (that.timer) clearTimeout(that.timer);
        that.timer = setTimeout(() => {
          func.apply(that, args)
        }, wait)
      }
  }
}
export default cart