'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var QQMapWX = require('../../../packages/amap/qqmap-wx-jssdk.js');
var qqmapsdk;
exports.default = Page({
  data: {
    name_is: "display:none",
    phone_is: "display:none",
    address_is: "display:none",
    pwd_is: "display:none",
    tempheight: 90

  },
  resetname: function resetname(e) {
    var that = this;
    if (e.type == "tap") that.setData({
      name_is: ""
    });
  },
  cancle: function cancle(e) {
    var that = this;
    switch (e.target.id) {
      case "namec":
        that.setData({
          name_is: "display:none"
        });
        break;
      case "phonec":
        that.setData({
          phone_is: "display:none"
        });
        break;
      case "pwdc":
        that.setData({
          pwd_is: "display:none"
        });
        break;
      case "addressc":
        that.setData({
          address_is: "display:none"
        });
        break;
      default:
        break;
    }
  },
  sure: function sure(e) {
    var that = this;
    switch (e.target.id) {
      case "names":
        wx.request({
          url: 'http://localhost:9999/user/update',
          header: {
            'content-type': 'application/json'
          },
          data: {
            user_name: that.data.tempName,
            user_id: getApp().globalData.openid
          },
          success: function success() {
            that.setData({
              name_is: "display:none",
              user_name: that.data.tempName
            });
          }
        });
        break;
      case "phones":
        wx.request({
          url: 'http://localhost:9999/user/updatet',
          header: {
            'content-type': 'application/json'
          },
          data: {
            teacher_phone: that.data.tempPhone,
            user_id: getApp().globalData.openid
          },
          success: function success() {
            that.setData({
              phone_is: "display:none",
              teacher_phone: that.data.tempPhone
            });
          }
        });
        break;
      case "pwds":
        that.setData({
          pwd_is: "display:none"
        });
        break;
      case "addresss":
        wx.request({
          url: 'http://localhost:9999/user/updatet',
          header: {
            'content-type': 'application/json'
          },
          data: {
            teacher_address: that.data.selectAddress,
            user_id: getApp().globalData.openid
          },
          success: function success() {
            that.setData({
              address_is: "display:none",
              teacher_address: that.data.selectAddress
            });
          }
        });
        break;
      default:
        break;
    }
  },
  getText: function getText(e) {
    var that = this;
    var temp = e.detail.value;
    switch (e.currentTarget.id) {
      case "name":
        that.setData({
          tempName: temp
        });
        break;
      case "phone":
        that.setData({
          tempPhone: temp
        });
        break;
      case "pwd":
        that.setData({
          tempPwd: temp
        });
        break;
      case "address":
        that.setData({
          tempAddress: temp
        });
        break;
      default:
        break;
    }
  },
  resetphone: function resetphone(e) {
    var that = this;
    if (e.type == "tap") that.setData({
      phone_is: ""
    });
  },
  resetaddress: function resetaddress(e) {
    var that = this;
    if (e.type == "tap") that.setData({
      address_is: ""
    });
  },
  resetpwd: function resetpwd(e) {},
  onLoad: function onLoad() {
    var that = this;
    wx.request({
      url: 'http://localhost:9999/user/selectAll',
      data: {
        user_id: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function success(res) {
        var tempdata = res.data.returnMap;
        console.log(tempdata);
        that.setData({
          teacher_address: tempdata.teacher_address,
          teacher_phone: tempdata.teacher_phone,
          teacher_remark: tempdata.teacher_remark,
          user_image: tempdata.user_image,
          user_name: tempdata.user_name,
          user_nickname: tempdata.user_nickname,
          creattime: tempdata.creattime,
          updatetime: tempdata.updatetime,
          lastLogintime: tempdata.lastLogintime
        });
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
          suggestion: [],
          tempheight: 90
        });
      }
    }
  },
  //触发关键词输入提示事件
  getsuggest: function getsuggest(e) {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'A5PBZ-7SYW4-RIHUP-XFZA2-MURDE-66BOO'
    });
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
          suggestion: sug,
          tempheight: that.data.tempheight + res.data.length * 40
        });
      }
    });
  }
});