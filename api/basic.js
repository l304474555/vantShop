/**
 * 封装微信的request
 */
// 请求域名
var _serverRoot = {}
var startupConfig = { 
  currentEnvironment: wx.getAccountInfoSync().miniProgram.envVersion || (__wxConfig && __wxConfig.envVersion),
  forceUseEnvironment: "trial",//强制使用某环境,只有非正式环境才可强制,可填release/trial/develop,不强值就填undefined,一个参数控制在开发或测试过程中的服务器地址
  release:{  //正式环境业务服务器地址
    serverRoot: {
      BASIC_URL : 'http://49.235.239.136',
    },
  },
  trial: {  //体验版环境业务服务器地址
    serverRoot: {
      BASIC_URL : 'http://49.235.239.136',
    },
  },
  develop: {  //开发版环境业务服务器地址
    serverRoot:{
      BASIC_URL : 'http://49.235.239.136',
    }
  }
}
//如果是非正式环境,并且强制指定了环境代码;
if (startupConfig.currentEnvironment !="release"&&startupConfig.forceUseEnvironment){
  _serverRoot = startupConfig[startupConfig.forceUseEnvironment].serverRoot
}
else{  
  _serverRoot = startupConfig[startupConfig.currentEnvironment].serverRoot
}
console.log("启动参数:", startupConfig, _serverRoot)

const BASIC_URL = _serverRoot.BASIC_URL

const APPID = __wxConfig.accountInfo.appId 

function request(options) {
  let that = this
  let _options = {
    url: '', data: {}, method: "POST", header: { 'Content-Type': 'application/json' }, isAuth: true, ...options
  }
  if(_options.isAuth){
    let token = getApp().globalData.token || wx.getStorageSync('token')
    _options.header = {
      'Content-Type': 'application/json',
      'token': token
    }
  }
  return new Promise(function (resolve, reject) {
    wx.showNavigationBarLoading();
    var parmUrl = (_options.url.indexOf('http') == 0 ? _options.url : BASIC_URL) + _options.url;
    console.log(parmUrl)
    wx.request({
      url: parmUrl,
      data: _options.data,
      method: _options.method,
      header: _options.header,
      success: function (res) {
        console.log(res.data)
        if(res.data.State == 4 && !_options.onceReload){ //用户暂无权限 onceReload允许重新请求一次
          _options.onceReload = true
          getApp().ajaxLogin().then(res=>{
            request(_options).then(res=>{
              resolve(res);
            })
          }, err=>{
            resolve(res.data);
          })
        } else {
          resolve(res.data);
        }
      },
      fail: function (err) {
        wx.showToast({
          title: '服务器异常，请稍后再试',
          icon:'none'
        })
        reject(err);
      },
      complete: function (res) {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }
    })
  });
};
function get(options) {
  options.method = 'GET'
  return request(options);
};
function post(options) {
  options.method = 'POST'
  return request(options);
};
module.exports = {
  get,
  post,
  request,
  APPID,
  BASIC_URL,
  _serverRoot
};
