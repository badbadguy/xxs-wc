'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commonUtil = require('../../../../utils/common.util.js');

exports.default = Page({
  data: {
    show1: "",
    show2: "display:none",
    countryList: ['选择题', '填空题', '语音题'],
    checklist: ['选择题'],
    question_type: 0,
    images: ""
  },
  removeImage: function removeImage(e) {
    var idx = e.target.dataset.idx;
    this.setData({
      images: ""
    });
  },
  chooseImage: function chooseImage(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function success(res) {
        // wx.uploadFile({
        //   url:getApp().globalData.headurl + 'test',
        //   filePath: res.tempFilePaths[0],
        //   name: 'file',
        // });
        var images = that.data.images.concat(res.tempFilePaths);
        // 限制最多只能留下3张照片
        that.setData({
          images: res.tempFilePaths[0]
        });
      }
    });
  },
  typechange: function typechange(e) {
    var that = this;
    switch (e.detail.value[0]) {
      case '语音题':
        that.setData({
          show1: "display:none",
          show2: "",
          question_type: 1
        });
        break;
      case '选择题':
        that.setData({
          show1: "",
          show2: "display:none",
          question_type: 0
        });
        break;
      case '填空题':
        that.setData({
          show1: "display:none",
          show2: "",
          question_type: 2
        });
        break;
      default:
        break;
    }
  },
  formSubmit: function formSubmit(res) {
    console.log(res);
  }
});