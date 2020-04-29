/**
 * 封装微信的request
 */
// 请求域名
// https://iotapi.myj.com.cn/v2;正式
// https://iotapitest.myj.com.cn/test; 
// iotapi.myj.com.cn 正式
// iotapitest.myj.com.cn 测试
//正式环境
// const BASIC_URL = 'https://iotapi.myj.com.cn/v2';
// const BASIC_URL_ZB = 'https://m.myj.com.cn';
//测试环境
// const BASIC_URL = 'https://iotapitest.myj.com.cn/test';
// const BASIC_URL_ZB = 'https://mtest.myj.com.cn';
var _serverRoot = {}
var startupConfig = { 
  currentEnvironment: wx.getAccountInfoSync().miniProgram.envVersion || (__wxConfig && __wxConfig.envVersion),
  forceUseEnvironment: "trial",//强制使用某环境,只有非正式环境才可强制,可填release/trial/develop,不强值就填undefined,一个参数控制在开发或测试过程中的服务器地址
  release:{  //正式环境业务服务器地址
    serverRoot: {
      BASIC_URL : 'http://106.13.92.130',
    },
  },
  trial: {  //体验版环境业务服务器地址
    serverRoot: {
      BASIC_URL : 'http://106.13.92.130',
    },
  },
  develop: {  //开发版环境业务服务器地址
    serverRoot:{
      BASIC_URL : 'http://106.13.92.130',
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

function request(url, data = {}, method = "POST", contentType = 'application/json') {
  return new Promise(function (resolve, reject) {
    wx.showNavigationBarLoading();
    var parmUrl = (url.indexOf('http') == 0 ? '' : BASIC_URL) + url;
    console.log(parmUrl)
    wx.request({
      url: parmUrl,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType,
      },
      success: function (res) {
        resolve(res.data);
      },
      fail: function (err) {
        wx.showToast({
          title: '服务器异常，请稍后再试',
          icon:'none'
        })
        reject(err);
        console.log("failed");
      },
      complete: function (res) {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }
    })
  });
};
function get(url, data = {}, contentType) {
  return request(url, data, 'GET', contentType);
};
function post(url, data = {}, contentType) {
  return request(url, data, 'POST', contentType);
};
module.exports = {
  get,
  post,
  request,
  APPID,
  BASIC_URL,
  _serverRoot
};
