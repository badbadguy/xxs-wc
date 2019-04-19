"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    xixixi: true
  },
  onShow: function onShow() {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'user/sf',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_id: getApp().globalData.openid,
        xixixi: true
      },
      success: function success(res) {
        console.log(res);
        that.setData({
          user_type: res.data.user_type
        });
        switch (res.data.user_type) {
          case 2:
            if (!res.data.teacher_class) {
              console.log("没绑定班级");
              that.setData({
                xixixi: false
              });
              wx.showModal({
                title: '错误',
                content: '没绑定班级,请联系管理员',
                showCancel: false
              });
            }
            if (!res.data.teacher_subject) {
              console.log("没绑定学科");
              that.setData({
                xixixi: false
              });
              wx.showModal({
                title: '错误',
                content: '没绑定学科,请联系管理员',
                showCancel: false
              });
            }
            that.setData({
              ishead: res.data.teacher_ishead,
              teacher_subject: res.data.teacher_subject
            });
            break;
          case 3:
            if (!res.data.student_class) {
              console.log("没绑定班级");
              that.setData({
                xixixi: false
              });
              wx.showModal({
                title: '错误',
                content: '没绑定班级,请联系教师',
                showCancel: false
              });
            }
            if (!res.data.student_status) {
              console.log("班级申请未通过");
              that.setData({
                xixixi: false
              });
              wx.showModal({
                title: '错误',
                content: '班级申请未通过,请联系教师',
                showCancel: false
              });
            }
            break;
          case 4:
            if (!res.data.children_id) {
              console.log("没绑定学生");
              that.setData({
                xixixi: false
              });
              wx.showModal({
                title: '错误',
                content: '没绑定学生,将跳转绑定页面',
                showCancel: false,
                success: function success() {
                  wx.redirectTo({
                    url: '/pages/in/service/bindStudent/bindStudent'
                  });
                }
              });
            }
            break;
        }
      }
    });
  },

  gotowhere: function gotowhere(res) {
    var that = this;
    switch (res.currentTarget.id) {
      case "0":
        wx.navigateTo({
          url: '/pages/in/service/leave/leave?user_type=' + that.data.user_type
        });
        break;
      case "1":
        wx.navigateTo({
          url: '/pages/in/service/translate/translate'
        });
        break;
      case "2":
        wx.navigateTo({
          url: '/pages/in/service/ranking/ranking'
        });
        break;
      case "3":
        wx.navigateTo({
          url: '/pages/in/service/mark/mark'
        });
        break;
      case "4":
        wx.navigateTo({
          url: '/pages/in/service/showexer/showexer?teacher_subject=' + that.data.teacher_subject
        });
        break;
      case "5":
        wx.navigateTo({
          url: '/pages/in/service/doexercises/select'
        });
        break;d;
      case "6":
        wx.navigateTo({
          url: '/pages/in/service/checkWrong/checkkWrong'
        });
      case "7":
        wx.navigateTo({
          url: '/pages/in/service/sureStudent/sureStudent'
        });
        break;
      case "8":
        wx.navigateTo({
          url: '/pages/in/service/exercises/exercises?teacher_subject=' + that.data.teacher_subject
        });
        break;
      case "9":
        wx.navigateTo({
          url: '/pages/in/service/checkStudent/checkStudent'
        });
        break;
      default:
        break;
    }
  }
});