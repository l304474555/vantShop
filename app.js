//app.js
import API from './api/index'
import vant from './utils/wxVant'
App({
  onLaunch: function () {
    let that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('wx.login')
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  ajaxLogin(){
    let that = this
    return new Promise(function (resolve, reject) {
      API.Login({UserName:"Goel",PassWord:123}).then(res=>{
        //测试登陆数据
        // let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VyTmFtZSI6IkdvZWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiLCJVc2VyUHdkIjoiMTIzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsIlVzZXJJZCI6Ijk5MmNjZjBhLTcyOWYtNGI3YS1hODkyLTFmY2VhNzgyZDRmYyIsIlRva2VuVGltZSI6IjIwMjAtMDUtMjFUMTE6NTU6NTkuMDE5NjczOCswODowMCJ9.ypmiWhD7qSRhbiPkV9zJMOiBaIPvxTrh04-vKkdV1qY"
        // that.globalData.token = token
        // wx.setStorageSync('token', token)
        // resolve()
        if(res.State == 1){
          let token = res.Result
          wx.setStorageSync('token', token)
          that.globalData.token = token
          resolve()
        } else {
          reject()
          wx.showToast({
            icon: 'none',
            title: res.Result
          })
        }
      })
    })
  },
  globalData: {
    token: '',
    userInfo: null
  },
  API
})