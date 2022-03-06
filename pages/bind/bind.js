
Page({
  data: {
    mobile: '',
    code: ''
  },
  getMobileInput: function(e){
      this.setData({
        mobile: e.detail.value
      })
  },
  getCodeInput: function(e){
    this.setData({
      code: e.detail.value
    })
  },
  getSmsCode: function(){
    wx.request({
      url: 'http://localhost:8080/admin/mobile/' + this.data.mobile,
      method: 'get',
      success(res) {
        //测试环境报文直接返回了短信验证码，生产环境服务端要接短信通道下发
        console.log(res)
      }
    })    
  },
  bind: function(){
    wx.request({
      url: 'http://localhost:8080/auth/oauth/token?mobile=SMS@'+this.data.mobile+'&code='+this.data.code+'&grant_type=mobile',
      method: 'post',
      header: {
        'Authorization': 'Basic cGlnOnBpZw=='
      },
      success(res) {
        var token = res.data.access_token
        wx.login({
          success(res){
            wx.request({
              url: 'http://localhost:8080/admin/social/bind?state=MINI&code=' + res.code,
              method: 'post',
              header: {
                'Authorization': 'Bearer '+token
              },
              success(r) {
                console.log(r)
                wx.showToast({
                  title: '绑定成功，注意观察 sys_user 表 mini_openid 字段是否更新',
                })
              }
            })
          }
        })        
      }
    })
  }
})
