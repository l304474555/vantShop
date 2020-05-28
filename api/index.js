import API from 'basic';
const Login = (data) => {
  return API.post({url: '/ShouManage/Login/Login', data, isAuth: false})
}
const GetMenus = (data) => {
  return API.post({url:'/ShouManage/Menu/GetMenus', data})
}
const GetPageHome = (data) => {
  return API.post({url:'/ShouManage/Pages/PageHome', data})
}
module.exports = {
  config: API,
  Login,
  GetMenus,
  GetPageHome,
}