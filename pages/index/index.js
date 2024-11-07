// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    username: '未登录'
  },
  login: function(){
    var self = this;
wx.login({
  success(res) {
    const params = {
      mobile: 'MINI@' + res.code,
      code: res.code
    }
    wx.request({
      // 登录端点，微服务 /auth/oauth2/token  ， 单体版本 /admin/oauth2/token
      url: 'http://localhost:9999/auth/oauth2/token?grant_type=mobile',
      method: 'post',
      data: params,
      header: {
        'Authorization': 'Basic cGlnOnBpZw==',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.statusCode === 401) {
          console.log(res.data);
          wx.showToast({
            title: '用户未绑定，请使用 sys_user 表存在的手机号进行绑定',
          })
          wx.navigateTo({
            url: '../bind/bind',
          });
        } else {
          self.setData({
            username: res.data.username,
          });
        }
      },
    });
  },
});
  }
})
