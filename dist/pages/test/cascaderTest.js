"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var QQMapWX = require('../../packages/amap/qqmap-wx-jssdk.js');
var qqmapsdk;
exports.default = Page({
  data: {
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + 'px',
    height: wx.DEFAULT_CONTENT_HEIGHT,
    show1: false,
    title1: '请选择',
    data1: [{ name: '加载失败' }],
    openid: null,
    showt: "display:none",
    shows: "",
    showp: "display:none",
    userType: 3, //0:超级管理员 1:管理员 2:教师 3:学生 4:家长
    countryList: ['教师', '学生', '家长'],
    checklist: ['学生'],
    parentType: 0, //0:妈妈 1:爸爸
    countryList2: ['父亲', '母亲'],
    checklist2: ['母亲'],
    name: "",
    tphone: "",
    tremark: "",
    sremark: "",
    chooseClass: "",
    chooseGrade: "",
    pphone: "",
    premark: "",
    tips: {},
    selectAddress: ""
  },
  onLoad: function onLoad() {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'A5PBZ-7SYW4-RIHUP-XFZA2-MURDE-66BOO'
    });
  },
  //数据回填方法
  backfill: function backfill(e) {
    var that = this;
    var id = e.currentTarget.id;
    for (var i = 0; i < that.data.suggestion.length; i++) {
      if (i == id) {
        that.setData({
          backfill: that.data.suggestion[i].addr,
          suggestion: []
        });
      }
    }
  },
  //触发关键词输入提示事件
  getsuggest: function getsuggest(e) {
    var that = this;
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function success(res) {
        //搜索成功后的回调
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        that.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug
        });
      },
      fail: function fail(error) {
        console.error(error);
      },
      complete: function complete(res) {
        console.log(res);
      }
    });
  },
  getText: function getText(e) {
    var that = this;
    switch (e.currentTarget.id) {
      case "name":
        that.setData({
          name: e.detail.value
        });
        break;
      case "tphone":
        that.setData({
          tphone: e.detail.value
        });
        break;
      case "tremark":
        that.setData({
          tremark: e.detail.value
        });
        break;
      case "sremark":
        that.setData({
          sremark: e.detail.value
        });
        break;
      case "pphone":
        that.setData({
          pphone: e.detail.value
        });
        break;
      case "premark":
        that.setData({
          premark: e.detail.value
        });
        break;
      default:
        break;
    }
  },
  parentchange: function parentchange(e) {
    var that = this;
    switch (e.detail.value[0]) {
      case '母亲':
        that.setData({
          parentType: 0
        });
        break;
      case '父亲':
        that.setData({
          parentType: 1
        });
        break;
      default:
        break;
    }
  },
  typechange: function typechange(e) {
    var that = this;
    switch (e.detail.value[0]) {
      case '教师':
        that.setData({
          showt: "",
          shows: "display:none",
          showp: "display:none",
          userType: 2
        });
        break;
      case '学生':
        that.setData({
          showt: "display:none",
          shows: "",
          showp: "display:none",
          userType: 3
        });
        break;
      case '家长':
        that.setData({
          showt: "display:none",
          shows: "display:none",
          showp: "",
          userType: 4
        });
        break;
      default:
        break;
    }
  },
  showPop1: function showPop1() {
    var that = this;
    that.setData({
      show1: true
    });
  },
  handleselected1: function handleselected1(e) {
    var that = this;
    var data = e.detail;
    that.data.title1 = "";
    for (var i = 0; i < data.length; i++) {
      that.data.title1 += data[i].name + ' ';
    }
    console.log(e.detail);
    var tempnum1 = parseInt(e.detail[0].value);
    that.setData({
      show1: false,
      title1: that.data.title1
      // chooseGrade: that.data.data1[e.detail[0].value].value,
      // chooseClass: that.data.data1[e.detail[0].value].children[e.detail[1].value]
    });
  },
  onReady: function onReady() {
    var that = this;
    wx.request({
      url: 'http://localhost:9999/class/checkclass2',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function success(res) {
        that.setData({
          data1: res.data
        });
      },
      fail: function fail(res) {
        console.log("fail");
        console.log(res.errMsg);
      }
    });
  }
});