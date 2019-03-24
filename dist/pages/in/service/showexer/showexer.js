'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    current1: 0,
    items: [],
    accordion: [{
      title: '排除重大事故',
      number: 20,
      state: 'abnormal',
      stateNum: 5,
      content: [{
        title: '防火墙无火烧或熏黑痕迹'
      }, {
        title: '发动机线束无火烧或熏黑痕迹'
      }, {
        title: '车辆覆盖件无火烧或熏黑痕迹'
      }, {
        title: '舱内保险丝盒无火烧或熏黑痕迹'
      }]
    }, {
      title: '排除水泡车',
      number: 8,
      state: 'normal',
      stateNum: 5,
      content: [{
        title: '防火墙无火烧或熏黑痕迹'
      }, {
        title: '发动机线束无火烧或熏黑痕迹'
      }, {
        title: '车辆覆盖件无火烧或熏黑痕迹'
      }, {
        title: '舱内保险丝盒无火烧或熏黑痕迹'
      }]
    }, {
      title: '排除水泡车',
      number: 8,
      state: 'normal',
      stateNum: 5,
      content: [{
        title: '防火墙无火烧或熏黑痕迹'
      }, {
        title: '发动机线束无火烧或熏黑痕迹'
      }, {
        title: '车辆覆盖件无火烧或熏黑痕迹'
      }, {
        title: '舱内保险丝盒无火烧或熏黑痕迹'
      }]
    }]
  },
  navigateBack: function navigateBack() {
    wx.navigateBack();
  },
  handleContentChange1: function handleContentChange1(e) {
    var current = e.detail.current;
    this.setData({
      current1: current
    });
  },
  handleChange1: function handleChange1(e) {
    var index = e.detail.index;
    this.setData({
      current1: index
    });
  }
});