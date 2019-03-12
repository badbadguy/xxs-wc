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
  onLoad: function onLoad(res) {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'A5PBZ-7SYW4-RIHUP-XFZA2-MURDE-66BOO'
    });
    that.setData({
      openid: res.openid,
      nickName: res.nickName,
      avatarUrl: res.avatarUrl
    });
  },
  setaddress: function setaddress(e) {
    var that = this;
    that.setData({
      selectAddress: e.detail.value
    });
  },
  submit: function submit(e) {
    var that = this;
    if (that.data.name == null || that.data.name == "") {
      wx.showAlert({
        title: '填写须知',
        content: '真实姓名不能为空！'
      });
      return;
    } else if (that.data.selectAddress == null || that.data.selectAddress == "") {
      wx.showAlert({
        title: '填写须知',
        content: '家庭住址不能为空！'
      });
      return;
    }
    switch (that.data.userType) {
      case 2:
        if (that.data.tphone == null || that.data.tphone == "") {
          wx.showAlert({
            title: '填写须知',
            content: '电话不能为空！'
          });
          return;
        }
        break;
      case 3:
        if (that.data.chooseClass == null || that.data.chooseClass == "" || that.data.chooseGrade == null || that.data.chooseGrade == "") {
          wx.showAlert({
            title: '填写须知',
            content: '班级不能为空！'
          });
          return;
        }
        break;
      case 4:
        if (that.data.pphone == null || that.data.pphone == "") {
          wx.showAlert({
            title: '填写须知',
            content: '电话不能为空！'
          });
          return;
        }
        break;
      default:
        break;
    }
    wx.request({
      url: getApp().globalData.headurl + 'user/add',
      data: {
        user_id: that.data.openid,
        user_nickname: that.data.nickName,
        user_name: that.data.name,
        user_image: that.data.avatarUrl,
        user_type: that.data.userType,
        parent_phone: that.data.pphone,
        parent_sex: that.data.parentType,
        parent_remark: that.data.premark,
        address: that.data.selectAddress,
        choose_class: that.data.chooseClass,
        choose_grade: that.data.chooseGrade,
        student_remark: that.data.sremark,
        teacher_phone: that.data.tphone,
        teacher_remark: that.data.tremark
      },
      header: {
        'content-type': 'application/json'
      },
      success: function success(res) {
        wx.switchTab({
          url: '/pages/in/homepage/homepage'
        });
      },
      fail: function fail(res) {
        console.log("fail");
        console.log(res.errMsg);
      }
    });
  },
  //数据回填方法
  backfill: function backfill(e) {
    var that = this;
    var id = e.currentTarget.id;
    for (var i = 0; i < that.data.suggestion.length; i++) {
      if (i == id) {
        that.setData({
          selectAddress: that.data.suggestion[i].addr,
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
    var tempgrade = "";
    var tempclass = "";
    switch (data[0].name) {
      case "一年级":
        tempgrade = 1;
        break;
      case "二年级":
        tempgrade = 2;
        break;
      case "三年级":
        tempgrade = 3;
        break;
      case "四年级":
        tempgrade = 4;
        break;
      case "五年级":
        tempgrade = 5;
        break;
      case "六年级":
        tempgrade = 6;
        break;
      default:
        break;
    }
    switch (data[1].name) {
      case "一班":
        tempclass = 1;
        break;
      case "二班":
        tempclass = 2;
        break;
      case "三班":
        tempclass = 3;
        break;
      case "四班":
        tempclass = 4;
        break;
      case "五班":
        tempclass = 5;
        break;
      case "六班":
        tempclass = 6;
        break;
      case "七班":
        tempclass = 7;
        break;
      case "八班":
        tempclass = 8;
        break;
      default:
        break;
    }
    that.setData({
      show1: false,
      title1: that.data.title1,
      chooseGrade: tempgrade,
      chooseClass: tempclass
    });
  },
  onReady: function onReady() {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'class/checkclass2',
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
        that.setData({
          data1: [{ name: '服务器奔溃' }]
        });
      }
    });
  }
});