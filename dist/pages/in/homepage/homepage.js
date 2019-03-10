'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
exports.default = Page({
  data: {},
  onLoad: function onLoad() {
    var that = this;
    that.setData({
      openid: app.globalData.openid
    });
    if (that.data.openid == null) {
      wx.redirectTo({
        url: '/pages/home/index'
      });
    }
  }
});