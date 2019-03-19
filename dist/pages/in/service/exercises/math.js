'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    checkbox: [0],
    countryList: ['心算', '选择题', '应用题'],
    checklist: ['心算'],
    show1: "display:none",
    show2: "display:none",
    show3: "",
    question_type: 2,
    tempValue: ""
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
  formSubmit: function formSubmit(res) {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'question/addMath',
      data: {
        tempjson: res.detail.value,
        question_type: that.data.question_type,
        subject_id: that.data.subject_id
      },
      header: {
        'content-type': 'application/json'
      }
    });
  },
  formReset: function formReset() {
    this.setData({
      checkbox: [0],
      tempValue: ""
    });
  }
});