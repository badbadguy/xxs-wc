'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _system = require('./static/utils/system.js');

var _system2 = _interopRequireDefault(_system);

var _util = require('./utils/util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
  globalData: {
    openid: '',
    // headurl: 'http://192.168.0.116:9999/',
    // headurl: 'http://10.50.34.86:9999/',
    headurl: 'http://192.168.191.1:9999/',
    history: []
  },
  onLaunch: function onLaunch() {
    var _this = this;

    _system2.default.attachInfo();
    wx.getStorage({
      key: 'history',
      success: function success(res) {
        _this.globalData.history = res.data;
      },
      fail: function fail(res) {
        console.log('get storage failed');
        console.log(res);
        _this.globalData.history = [];
      }
    });
  },

  // 权限询问
  getRecordAuth: function getRecordAuth() {
    wx.getSetting({
      success: function success(res) {
        console.log('succ');
        console.log(res);
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success: function success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              console.log('succ auth');
            },
            fail: function fail() {
              console.log('fail auth');
            }
          });
        } else {
          console.log('record has been authed');
        }
      },
      fail: function fail(res) {
        console.log('fail');
        console.log(res);
      }
    });
  },
  onShow: function onShow() {},
  onHide: function onHide() {
    wx.stopBackgroundAudio();
  }
});