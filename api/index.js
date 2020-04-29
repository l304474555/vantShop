import API from 'basic';
const GetMenus = (data) => {
  return API.post('/ShouManage/Menu/GetMenus', data)
}
module.exports = {
  config: API,
  GetMenus,
}