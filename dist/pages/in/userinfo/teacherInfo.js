'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {},
  onLoad: function onLoad() {
    var that = this;
    wx.request({
      url: 'http://localhost:9999/user/selectAll',
      data: {
        user_id: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function success(res) {
        var tempdata = res.data.returnMap;
        console.log(tempdata);
        that.setData({
          teacher_address: tempdata.teacher_address,
          teacher_phone: tempdata.teacher_phone,
          teacher_remark: tempdata.teacher_remark,
          user_image: tempdata.user_image,
          user_name: tempdata.user_name,
          user_nickname: tempdata.user_nickname
        });
      }
    });
  }
});