'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = Page({
  data: {
    subject_id: 'cd84a79d6ee04e4d9630731b25b589d0',
    title: '单选题',
    show3: show
  },
  handleShow3: function handleShow3() {
    this.setData({
      show3: false
    });
  },

  onLoad: function onLoad(res) {
    wx.request({
      url: getApp().globalData.headurl + 'homework/selectNum',
      header: {
        'content-type': 'application/json'
      },
      data: {
        question_type: type,
        subject_id: that.data.subject_id
      },
      success: function success(res) {
        var temp = "accordion" + type;
        that.setData(_defineProperty({}, temp, res.data.resultList));
      }
    });
  }
});