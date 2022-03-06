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
    wx.request({
      url: 'http://localhost:8080/auth/oauth/token?grant_type=mobile&mobile=MINI@' + res.code + '&code='+res.code,
      method: 'post',
      header: {
        Authorization: 'Basic c29jaWFsOnNvY2lhbA==',
      },
      success(res) {
        console.log(res);
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
