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
    if (that.data.current1 == '2' && that.data.subject_id == 'cd84a79d6ee04e4d9630731b25b589d0') {
      var tempheight = (that.data.accordion[parseInt(res.currentTarget.id)].children.length + 1) * 100;
    } else {
      var tempheight = 100;
    }
    console.log(tempheight);
    that.setData({
      heightAuto: tempheight + '%'
    });
  },

  onLoad: function onLoad() {
    this.question(0);
  },
  question: function question(temp) {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'question/select1',
      header: {
        'content-type': 'application/json'
      },
      data: {
        question_type: temp,
        subject_id: that.data.subject_id
      },
      success: function success(res) {
        var tempheight = res.data.resultList.length * 50;
        that.setData({
          accordion: res.data.resultList,
          heightAuto: tempheight + 'px'
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
        if (that.data.subject_id == 'cd84a79d6ee04e4d9630731b25b589d0') {
          that.question(3);
        } else {
          that.question(1);
        }
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