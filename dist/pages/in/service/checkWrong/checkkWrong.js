'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    current1: 0,
    subject_id: '33018ef1b3b74a18b6d9f94bff995d79',
    items: [],
    accordion: [{
      title: '查询出错',
      number: 1,
      state: 'abnormal',
      stateNum: 5,
      content: []
    }],
    heightAuto: "200%"
  },
  slide: function slide(res) {
    var that = this;
    if (that.data.current1 == '1') {
      var tempheight = that.data.accordion.length * 330;
    } else if (that.data.current1 == '2') {
      var tempheight = that.data.accordion.length * 210;
    } else if (that.data.current1 == '3') {
      var tempheight = that.data.accordion.length * 210;
    } else if (that.data.current1 == '4') {
      var tempheight = that.data.accordion.length * 330;
    }
    that.setData({
      heightAuto: tempheight + 'rpx'
    });
  },

  onLoad: function onLoad() {
    console.log(getApp().globalData.openid);
    this.question(0);
  },
  question: function question(temp) {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'answer/checkWrong',
      header: {
        'content-type': 'application/json'
      },
      data: {
        question_type: temp,
        student_id: getApp().globalData.openid
      },
      success: function success(res) {
        var tempheight = parseInt(res.data.length) * 706;
        that.setData({
          accordion: res.data,
          heightAuto: tempheight + 'rpx'
        });
      }
    });
  },
  navigateBack: function navigateBack() {
    wx.navigateBack();
  },
  handleContentChange1: function handleContentChange1(e) {
    var that = this;
    var current = e.detail.current;
    that.setData({
      current1: current
    });
    switch (current) {
      case 0:
        that.question(0);
        break;
      case 1:
        that.question(2);
        break;
      case 2:
        that.question(1);
        break;
      case 3:
        that.question(3);
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
  }
});