'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    imgurl: [{ "url": '../../../../imgs/service/no1.png' }, { "url": '../../../../imgs/service/no2.png' }, { "url": '../../../../imgs/service/no3.png' }]
  },
  onLoad: function onLoad() {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'answer/ranking',
      header: {
        'content-type': 'application/json'
      },
      data: {},
      success: function success(res) {
        that.setData({
          ranking: res.data
        });
      }
    });
  }
});