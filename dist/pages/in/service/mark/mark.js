'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = Page({
  data: {
    subject_id: '33018ef1b3b74a18b6d9f94bff995d79',
    accordion0: [],
    accordionValue0: [],
    accordion1: [],
    accordionValue1: [],
    accordion2: [],
    accordionValue2: [],
    accordion3: [],
    accordionValue3: [],
    show0: false,
    show1: false,
    show2: false,
    show3: false
  },
  change0: function change0(e) {
    this.setData({
      accordionValue0: e.detail.value
    });
  },
  change1: function change1(e) {
    this.setData({
      accordionValue1: e.detail.value
    });
  },
  change2: function change2(e) {
    this.setData({
      accordionValue2: e.detail.value
    });
  },
  change3: function change3(e) {
    this.setData({
      accordionValue3: e.detail.value
    });
  },
  openPopup0: function openPopup0(e) {
    var show = e.currentTarget.dataset.show;
    this.setData({
      show0: show
    });
  },
  handleShow0: function handleShow0() {
    this.setData({
      show0: false
    });
  },
  openPopup1: function openPopup1(e) {
    var show = e.currentTarget.dataset.show;
    this.setData({
      show1: show
    });
  },
  handleShow1: function handleShow1() {
    this.setData({
      show1: false
    });
  },
  openPopup2: function openPopup2(e) {
    var show = e.currentTarget.dataset.show;
    this.setData({
      show2: show
    });
  },
  handleShow2: function handleShow2() {
    this.setData({
      show2: false
    });
  },
  openPopup3: function openPopup3(e) {
    var show = e.currentTarget.dataset.show;
    this.setData({
      show3: show
    });
  },
  handleShow3: function handleShow3() {
    this.setData({
      show3: false
    });
  },
  selectTo: function selectTo() {
    var that = this;
    var tempNum = that.data.accordionValue0.length + that.data.accordionValue1.length + that.data.accordionValue2.length + that.data.accordionValue3.length;
    wx.request({
      url: getApp().globalData.headurl + 'homework/add',
      header: {
        'content-type': 'application/json'
      },
      data: {
        subject_id: that.data.subject_id,
        teacher_id: getApp().globalData.openid,
        question0_id: that.data.accordionValue0,
        question1_id: that.data.accordionValue1,
        question2_id: that.data.accordionValue2,
        question3_id: that.data.accordionValue3,
        num: tempNum
      },
      success: function success(res) {}
    });
  },

  onLoad: function onLoad() {
    var that = this;
    that.getQuestion(0);
    that.getQuestion(1);
    that.getQuestion(2);
    that.getQuestion(3);
    var tempDate = new Date();
    //年
    var Y = tempDate.getFullYear();
    //月
    var M = tempDate.getMonth() + 1 < 10 ? '0' + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1;
    //日
    var D = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
    that.setData({
      nowTime: Y + "-" + M + "-" + D
    });
  },
  getQuestion: function getQuestion(type) {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'question/select2',
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