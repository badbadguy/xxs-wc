'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {},
  onLoad: function onLoad() {
    var that = this;
    that.setData({
      openid: getApp().globalData.openid
    });
    if (that.data.openid == null) {
      wx.redirectTo({
        url: '/pages/home/index'
      });
    }
  }
});