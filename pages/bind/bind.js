Page({
  data: {
    mobile: '',
    code: ''
  },
  getSmsCode: function(){
    wx.request({
      url: `http://localhost:9999/admin/sysMessage/send/smsCode?mobile=${this.data.mobile}`,
      method: 'get',
      success(res) {
        //测试环境报文直接返回了短信验证码，生产环境服务端要接短信通道下发
        wx.showToast({
          title: '短信已发送，请注意查看后台日志输出【验证码】',
        })
      }
    })    
  },
  bind: function(){
    const params = {
      mobile: 'SMS@' + this.data.mobile,
      code: this.data.code,
      grant_type: 'mobile'
    }
    wx.request({
      // 登录端点，微服务 /auth/oauth2/token  ， 单体版本 /admin/oauth2/token
      url: 'http://localhost:9999/auth/oauth2/token',
      method: 'post',
      data: params,
      header: {
        'Authorization': 'Basic cGlnOnBpZw==',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        var token = res.data.access_token
        wx.login({
          success(res){
            wx.request({
              url: 'http://localhost:9999/admin/social/bind?state=MINI&code=' + res.code,
              method: 'post',
              header: {
                'Authorization': 'Bearer '+token
              },
              success(r) {
                wx.showModal({
                  title: '绑定成功',
                  content: '注意观察 sys_user 表 mini_openid 字段是否更新',
                  success (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../index/index',
                      });
                    } else if (res.cancel) {
                      // 用户点击取消
                    }
                  }
                });
              }
            })
          }
        })        
      }
    })
  }
})
