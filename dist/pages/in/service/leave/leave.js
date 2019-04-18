'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    list: []
  },
  onShow: function onShow() {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'leave/select',
      header: {
        'content-type': 'application/json'
      },
      data: {
        to_user_id: getApp().globalData.openid
      },
      success: function success(res) {
        console.log(res);
        that.setData({
          list: res.data
        });
      }
    });
  }
});