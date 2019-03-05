"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + 'px',
    height: wx.DEFAULT_CONTENT_HEIGHT,
    show1: false,
    title1: '请选择',
    data1: []
  },
  showPop1: function showPop1() {
    this.setData({
      show1: true
    });
  },
  navigateBack: function navigateBack() {
    console.log("navigateBack");
    wx.navigateBack();
  },
  handleselected1: function handleselected1(e) {
    var data = e.detail;
    this.data.title1 = "";
    for (var i = 0; i < data.length; i++) {
      this.data.title1 += data[i].name + ' ';
    }
    this.setData({
      show1: false,
      title1: this.data.title1
    });
  },
  onReady: function onReady() {
    this.setData({
      data1: [{
        name: '一年级',
        value: '1',
        children: [{
          name: '一班',
          value: '1'
        }, {
          name: '二班',
          value: '2'
        }]
      }, {
        name: '二年级',
        value: '2',
        children: [{
          name: '一班',
          value: '1'
        }, {
          name: '二班',
          value: '2'
        }]
      }, {
        name: '三年级',
        value: '3',
        children: [{
          name: '一班',
          value: '1'
        }, {
          name: '二班',
          value: '2'
        }]
      }, {
        name: '四年级',
        value: '4',
        children: [{
          name: '一班',
          value: '1'
        }, {
          name: '二班',
          value: '2'
        }]
      }]
    });
  }
});