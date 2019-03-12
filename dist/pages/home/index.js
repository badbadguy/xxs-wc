Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },
  goLogined: function(res){
    var tempopenid;
    wx.login({
      success: res => {
        wx.request({
          // 根据code获取openid
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx53dac20eb7248329&secret=4f82e5b3b68c4a1d801d6cbf7430b895&js_code=' + res.code + '&grant_type=authorization_code',
          success: res => {
            // 获取到用户的 openid
            tempopenid = res.data.openid;
            getApp().globalData.openid = tempopenid;
            wx.request({
              url: getApp().globalData.headurl + 'user/select',
              data: {
                user_id: tempopenid
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                if (res.data.data.total == 0) {
                  wx.getUserInfo({
                    success:function(e){
                      wx.redirectTo({
                        url: '/pages/test/cascaderTest'
                      })
                    }
                  })
                } else {
                  wx.request({
                    url: getApp().globalData.headurl + 'user/updateLastLoginTime',
                    data: {
                      user_id: tempopenid
                    },
                    success:function(){
                      wx.switchTab({
                        url: '/pages/in/homepage/homepage'
                      })
                    }
                  })
                }
              }
            })
          }
        });
      }
    });
  }
  ,

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 调用微信的wx.login接口获取code
              that.goLogined(res);
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      wx.getUserInfo({
        success: function (res) {
          that.goLogined(res);
        }
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})
