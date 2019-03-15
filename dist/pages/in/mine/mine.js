'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    menuitems: []
  },
  onLoad: function onLoad() {
    var that = this;
    that.setData({
      openid: getApp().globalData.openid
    });
    if (that.data.openid == null) {
      wx.redirectTo({
        url: '/pages/home/index'
      });
    } else {
      wx.request({
        url: getApp().globalData.headurl + 'user/select',
        data: {
          user_id: that.data.openid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function success(res) {
          console.log(res.data.data.list[0]);
          var tempdata = res.data.data.list[0];
          //用户类型(0:超级管理员 1:管理员 2:教师 3:学生 4:家长)
          var temp = [];
          switch (tempdata.user_type) {
            case 0:
              break;
            case 1:
              break;
            case 2:
              temp = [{ text: '账号信息', url: '../userinfo/teacherInfo', icon: '../../../imgs/mine/accountInfo.png', tips: '' }, { text: '作业发布历史', url: '../history/teacherHistory', icon: '../../../imgs/mine/history.png', tips: '' }];
              break;
            case 3:
              temp = [{ text: '账号信息', url: '../userinfo/studentInfo', icon: '../../../imgs/mine/accountInfo.png', tips: '' }, { text: '作业提交历史', url: '../history/studentHistory', icon: '../../../imgs/mine/history.png', tips: '' }];
            case 4:
              temp = [{ text: '账号信息', url: '../userinfo/parentInfo', icon: '../../../imgs/mine/accountInfo.png', tips: '' }];
              break;
            default:
              break;
          }
          that.setData({
            imgurl: tempdata.user_image,
            user_type: tempdata.user_type,
            user_name: tempdata.user_name,
            user_nickname: tempdata.user_nickname,
            menuitems: temp
          });
        }
      });
    }
  }
});