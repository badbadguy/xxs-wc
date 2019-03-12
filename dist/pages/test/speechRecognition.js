"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var recorderManager = wx.getRecorderManager();
function sendRecord(src) {
  var obj = {
    // 已经在花生壳中映射到本地端口-3001 
    url: "http://xxx:34306/post",
    filePath: src,
    name: "fffile",
    header: {
      'Content-Type': 'application/json'
    },
    success: function success(result) {
      var data = JSON.parse(result.data);
      // msg 为最终语音识别的字符串
      var msg = data.result;
      // 获取当前页面对象
      var page = getCurrentPages()[0];
      page.setData({ msg: msg });
    },
    fail: function fail(err) {
      console.log(err);
    }
  };
  wx.uploadFile(obj);
};
// 结束录音的时候触发 
recorderManager.onStop(function (res) {
  // 获取文件路径-提交到后台-后台发送到百度
  sendRecord(res.tempFilePath);
});
recorderManager.onError(function (res) {
  console.log("error", res);
});
exports.default = Page({
  data: {},
  // 按下按钮的时候触发
  startrecorderHandel: function startrecorderHandel() {
    // 开始录音
    recorderManager.start({});
  },

  // 松开按钮的时候触发-发送录音
  sendrecorderHandel: function sendrecorderHandel() {
    // 结束录音
    recorderManager.stop();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    wx.authorize({
      scope: 'record'
    });
  }
});