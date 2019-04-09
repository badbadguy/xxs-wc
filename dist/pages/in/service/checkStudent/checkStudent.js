'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {},
  onLoad: function onLoad() {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'homework/checkStudent',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_id: getApp().globalData.openid
      },
      success: function success(res) {
        that.setData({
          chinese: res.data.chinese,
          english: res.data.english,
          math: res.data.math
        });
      }
    });
  }
});