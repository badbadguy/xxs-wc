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
  onLoad: function onLoad(res) {
    var that = this;
    that.setData({
      subject_id: res.id
    });
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
        var images = that.data.images.concat(res.tempFilePaths);
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
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'question/addCommon',
      data: {
        tempjson: res.detail.value,
        question_type: that.data.question_type,
        subject_id: that.data.subject_id,
        question_image: that.data.tempimagesurl
      },
      header: {
        'content-type': 'application/json'
      },
      success: function success() {
        wx.showToast({
          title: "已上传！",
          icon: 'success'
        });
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/in/service/service'
          });
        }, 1500);
      }
    });
  },
  try11: function try11(e) {
    var that = this;
    var i = 0;
    if (that.data.images != "") {
      wx.uploadFile({
        url: getApp().globalData.headurl + 'question/picture',
        filePath: that.data.images,
        name: 'file',
        success: function success(e) {
          that.setData({
            tempimagesurl: e.data
          });
        }
      });
    }
    wx.showConfirm({
      title: '提示',
      content: '确认上传吗',
      cancelColor: 'red',
      confirmColor: '#3399ff',
      confirmText: '确定',
      cancelText: '返回',
      success: function success(res) {
        if (res.confirm) {
          that.formSubmit(e);
        }
      }
    });
  }
});