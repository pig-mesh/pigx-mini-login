
import Dialog from '@vant/weapp/dialog/dialog';

Page({
  data: {
    mobile: '',
    code: ''
  },
  getSmsCode: function(){
    wx.request({
      url: 'http://localhost:9999/admin/mobile/' + this.data.mobile,
      method: 'get',
      success(res) {
        //测试环境报文直接返回了短信验证码，生产环境服务端要接短信通道下发
        console.log(res.data.msg)
        Dialog.alert({
          title: '模拟验证码',
          message: res.data.msg,
        }).then(() => {
          // on close
        });
      }
    })    
  },
  bind: function(){
    wx.request({
      url: 'http://localhost:9999/auth/oauth2/token?mobile=SMS@'+this.data.mobile+'&code='+this.data.code+'&grant_type=mobile',
      method: 'post',
      header: {
        'Authorization': 'Basic cGlnOnBpZw=='
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

                Dialog.alert({
                  title: '绑定成功',
                  message: '注意观察 sys_user 表 mini_openid 字段是否更新',
                }).then(() => {
                  wx.navigateTo({
                    url: '../index/index',
                  });
                });

              }
            })
          }
        })        
      }
    })
  }
})
