'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = Page({
  data: {
    checkbox: [0],
    countryList: ['心算', '选择题', '应用题'],
    checklist: ['心算'],
    show1: "display:none",
    show2: "display:none",
    show3: "",
    question_type: 2,
    tempValue: "",
    images: []
  },
  removeImage: function removeImage(e) {
    var idx = e.target.dataset.idx;
    console.log(e);
    console.log(idx);
    this.setData({
      images: []
    });
  },
  imageClick: function imageClick(e) {
    var that = this;
    var arr = Array();
    arr.push(that.data.images);
    console.log(arr);
    wx.previewImage({
      current: that.data.images,
      urls: arr
    });
  },
  chooseImage: function chooseImage(e) {
    var that = this;
    var index = e.target.id;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function success(res) {
        var temp = "images[" + index + "]";
        that.setData(_defineProperty({}, temp, res.tempFilePaths));
        console.log(that.data.images.length);
      }
    });
  },
  typechange: function typechange(e) {
    var that = this;
    switch (e.detail.value[0]) {
      case '应用题':
        that.setData({
          show1: "",
          show2: "",
          show3: "display:none",
          question_type: 3,
          tempValue: ""
        });
        break;
      case '心算':
        that.setData({
          show1: "display:none",
          show2: "display:none",
          show3: "",
          question_type: 2,
          tempValue: ""
        });
        break;
      case '选择题':
        that.setData({
          show1: "display:none",
          show2: "",
          show3: "display:none",
          question_type: 0,
          tempValue: ""
        });
        break;
      default:
        break;
    }
  },
  onLoad: function onLoad(res) {
    var that = this;
    that.setData({
      subject_id: res.id
    });
  },
  insert: function insert() {
    var cb = this.data.checkbox;
    cb.push(this.data.checkbox.length);
    this.setData({
      checkbox: cb
    });
  },
  delBind: function delBind() {
    var cb = this.data.checkbox;
    if (this.data.checkbox.length <= 1) return;
    cb.pop(this.data.checkbox.length);
    this.setData({
      checkbox: cb
    });
  },
  uploadTo: function uploadTo(i) {
    var that = this;
    var tempurl = that.data.images[i];
    console.log(tempurl);
    wx.uploadFile({
      url: getApp().globalData.headurl + 'test',
      filePath: tempurl,
      name: 'file',
      success: function success(e) {
        console.log(e);
      }
    });
    if (i + 1 < that.data.images.length) {
      i++;
      that.uploadTo(i);
    }
  },
  formSubmit: function formSubmit(res) {
    var that = this;
    if (that.data.images != null || that.data.images != "") {
      var i = 0;
      that.uploadTo(i);
    }
    // wx.request({
    //     url:getApp().globalData.headurl + 'question/addMath',
    //     data:{
    //       tempjson:res.detail.value,
    //       question_type:that.data.question_type,
    //       subject_id:that.data.subject_id
    //     },
    //     header: {
    //       'content-type': 'application/json'
    //     },
    // })
  },
  formReset: function formReset() {
    this.setData({
      checkbox: [0],
      tempValue: ""
    });
  }
});