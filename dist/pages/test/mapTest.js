'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var that = undefined;
var QQMapWX = require('../../packages/amap/qqmap-wx-jssdk.js');
var qqmapsdk;
exports.default = Page({
  data: {},
  onLoad: function onLoad() {
    qqmapsdk = new QQMapWX({
      key: 'A5PBZ-7SYW4-RIHUP-XFZA2-MURDE-66BOO'
    });
  },
  //数据回填方法
  backfill: function backfill(e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        this.setData({
          backfill: this.data.suggestion[i].addr,
          suggestion: []
        });
      }
    }
  },
  //触发关键词输入提示事件
  getsuggest: function getsuggest(e) {
    var _this = this;
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function success(res) {
        //搜索成功后的回调
        console.log(res);
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
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
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
  onShow: function onShow() {
    // 调用接口
    qqmapsdk.search({
      keyword: '酒店',
      success: function success(res) {
        console.log(res);
      },
      fail: function fail(res) {
        console.log(res);
      },
      complete: function complete(res) {
        console.log(res);
      }
    });
  }
});