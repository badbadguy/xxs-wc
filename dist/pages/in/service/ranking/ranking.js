'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    imgurl: [{ "url": '../../../../imgs/service/no1.png' }, { "url": '../../../../imgs/service/no2.png' }, { "url": '../../../../imgs/service/no3.png' }],
    current1: 0
  },
  handleContentChange1: function handleContentChange1(e) {
    var that = this;
    var current = e.detail.current;
    this.setData({
      current1: current
    });
    switch (current) {
      case 0:
        that.getRanking('33018ef1b3b74a18b6d9f94bff995d79');
        break;
      case 1:
        that.getRanking('cd84a79d6ee04e4d9630731b25b589d0');
        break;
      case 2:
        that.getRanking('79bed2b0e57c4f7f8e71b9817f03e3b9');
        break;
      default:
        break;
    }
  },
  handleChange1: function handleChange1(e) {
    var index = e.detail.index;
    this.setData({
      current1: index
    });
  },
  onLoad: function onLoad() {
    this.getRanking('33018ef1b3b74a18b6d9f94bff995d79');
  },
  getRanking: function getRanking(subject) {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'answer/ranking',
      header: {
        'content-type': 'application/json'
      },
      data: {
        subject_id: subject
      },
      success: function success(res) {
        that.setData({
          ranking: res.data
        });
      }
    });
  }
});