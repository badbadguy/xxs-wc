'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _conf = require('../../../../utils/conf.js');

//what
var app = getApp();
var util = require('../../../../utils/util.js');
var plugin = requirePlugin("WechatSI");

var manager = plugin.getRecordRecognitionManager();

exports.default = Page({
  data: {
    dialogList: [
      // {
      //   // 当前语音输入内容
      //   create: '04/27 15:37',
      //   lfrom: 'zh_CN',
      //   lto: 'en_US',
      //   text: '这是测试这是测试这是测试这是测试',
      //   translateText: 'this is test.this is test.this is test.this is test.',
      //   voicePath: '',
      //   translateVoicePath: '',
      //   autoPlay: false, // 自动播放背景音乐
      //   id: 0,
      // },
    ],
    scroll_top: 10000, // 竖向滚动条位置

    bottomButtonDisabled: false, // 底部按钮disabled

    tips_language: _conf.language[0], // 目前只有中文

    initTranslate: {
      // 为空时的卡片内容
      create: '04/27 15:37',
      text: '等待说话'
    },

    currentTranslate: {
      // 当前语音输入内容
      create: '04/27 15:37',
      text: '等待说话'
    },
    recording: false, // 正在录音
    recordStatus: 0, // 状态： 0 - 录音中 1- 翻译中 2 - 翻译完成/二次翻译

    toView: 'fake', // 滚动位置
    lastId: -1, // dialogList 最后一个item的 id
    currentTranslateVoice: '' // 当前播放语音路径
  },
  /**
   * 按住按钮开始语音识别
   */
  streamRecord: function streamRecord(e) {
    // console.log("streamrecord" ,e)
    var detail = e.detail || {};
    var buttonItem = detail.buttonItem || {};
    manager.start({
      lang: buttonItem.lang
    });

    this.setData({
      recordStatus: 0,
      recording: true,
      currentTranslate: {
        // 当前语音输入内容
        create: util.recordTime(new Date()),
        text: '正在聆听中',
        lfrom: buttonItem.lang,
        lto: buttonItem.lto
      }
    });
    this.scrollToNew();
  },
  /**
   * 松开按钮结束语音识别
   */
  streamRecordEnd: function streamRecordEnd(e) {

    // console.log("streamRecordEnd" ,e)
    var detail = e.detail || {}; // 自定义组件触发事件时提供的detail对象
    var buttonItem = detail.buttonItem || {};

    // 防止重复触发stop函数
    if (!this.data.recording || this.data.recordStatus != 0) {
      console.warn("has finished!");
      return;
    }
    manager.stop();
    this.setData({
      bottomButtonDisabled: true
    });
  },
  /**
   * 翻译
   */
  translateText: function translateText(item, index) {
    var _this = this;

    var lfrom = item.lfrom || 'zh_CN';
    var lto = item.lto || 'en_US';

    plugin.translate({
      lfrom: lfrom,
      lto: lto,
      content: item.text,
      tts: true,
      success: function success(resTrans) {

        var passRetcode = [0, // 翻译合成成功
        -10006, // 翻译成功，合成失败
        -10007, // 翻译成功，传入了不支持的语音合成语言
        -10008];

        if (passRetcode.indexOf(resTrans.retcode) >= 0) {
          var tmpDialogList = _this.data.dialogList.slice(0);

          if (!isNaN(index)) {

            var tmpTranslate = Object.assign({}, item, {
              autoPlay: true, // 自动播放背景音乐
              translateText: resTrans.result,
              translateVoicePath: resTrans.filename || "",
              translateVoiceExpiredTime: resTrans.expired_time || 0
            });

            tmpDialogList[index] = tmpTranslate;

            _this.setData({
              dialogList: tmpDialogList,
              bottomButtonDisabled: false,
              recording: false
            });

            _this.scrollToNew();
          } else {
            console.error("index error", resTrans, item);
          }
        } else {
          console.warn("翻译失败", resTrans, item);
        }
      },
      fail: function fail(resTrans) {
        console.error("调用失败", resTrans, item);
        this.setData({
          bottomButtonDisabled: false,
          recording: false
        });
      },
      complete: function complete(resTrans) {
        _this.setData({
          recordStatus: 1
        });
        wx.hideLoading();
      }
    });
  },
  /**
   * 修改文本信息之后触发翻译操作
   */
  translateTextAction: function translateTextAction(e) {
    // console.log("translateTextAction" ,e)
    var detail = e.detail; // 自定义组件触发事件时提供的detail对象
    var item = detail.item;
    var index = detail.index;
    this.translateText(item, index);
  },
  /**
   * 语音文件过期，重新合成语音文件
   */
  expiredAction: function expiredAction(e) {
    var _this2 = this;

    var detail = e.detail || {}; // 自定义组件触发事件时提供的detail对象
    var item = detail.item || {};
    var index = detail.index;

    if (isNaN(index) || index < 0) {
      return;
    }

    var lto = item.lto || 'en_US';

    plugin.textToSpeech({
      lang: lto,
      content: item.translateText,
      success: function success(resTrans) {
        if (resTrans.retcode == 0) {
          var tmpDialogList = _this2.data.dialogList.slice(0);

          var tmpTranslate = Object.assign({}, item, {
            autoPlay: true, // 自动播放背景音乐
            translateVoicePath: resTrans.filename,
            translateVoiceExpiredTime: resTrans.expired_time || 0
          });

          tmpDialogList[index] = tmpTranslate;

          _this2.setData({
            dialogList: tmpDialogList
          });
        } else {
          console.warn("语音合成失败", resTrans, item);
        }
      },
      fail: function fail(resTrans) {
        console.warn("语音合成失败", resTrans, item);
      }
    });
  },
  /**
   * 初始化为空时的卡片
   */
  initCard: function initCard() {
    var initTranslateNew = Object.assign({}, this.data.initTranslate, {
      create: util.recordTime(new Date())
    });
    this.setData({
      initTranslate: initTranslateNew
    });
  },
  /**
   * 删除卡片
   */
  deleteItem: function deleteItem(e) {
    var _this3 = this;

    // console.log("deleteItem" ,e)
    var detail = e.detail;
    var item = detail.item;

    var tmpDialogList = this.data.dialogList.slice(0);
    var arrIndex = detail.index;
    tmpDialogList.splice(arrIndex, 1);

    // 不使用setTImeout可能会触发 Error: Expect END descriptor with depth 0 but get another
    setTimeout(function () {
      _this3.setData({
        dialogList: tmpDialogList
      });
      if (tmpDialogList.length == 0) {
        _this3.initCard();
      }
    }, 0);
  },
  /**
   * 识别内容为空时的反馈
   */
  showRecordEmptyTip: function showRecordEmptyTip() {
    this.setData({
      recording: false,
      bottomButtonDisabled: false
    });
    wx.showToast({
      title: this.data.tips_language.recognize_nothing,
      icon: 'success',
      image: '/imgs/no_voice.png',
      duration: 1000,
      success: function success(res) {},
      fail: function fail(res) {
        console.log(res);
      }
    });
  },
  /**
   * 初始化语音识别回调
   * 绑定语音播放开始事件
   */
  initRecord: function initRecord() {
    var _this4 = this;

    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = function (res) {
      var currentData = Object.assign({}, _this4.data.currentTranslate, {
        text: res.result
      });
      _this4.setData({
        currentTranslate: currentData
      });
      _this4.scrollToNew();
    };

    // 识别结束事件
    manager.onStop = function (res) {

      var text = res.result;

      if (text == '') {
        _this4.showRecordEmptyTip();
        return;
      }

      var lastId = _this4.data.lastId + 1;

      var currentData = Object.assign({}, _this4.data.currentTranslate, {
        text: res.result,
        translateText: '正在翻译中',
        id: lastId,
        voicePath: res.tempFilePath
      });

      _this4.setData({
        currentTranslate: currentData,
        recordStatus: 1,
        lastId: lastId
      });

      _this4.scrollToNew();

      _this4.translateText(currentData, _this4.data.dialogList.length);
    };

    // 识别错误事件
    manager.onError = function (res) {

      _this4.setData({
        recording: false,
        bottomButtonDisabled: false
      });
    };

    // 语音播放开始事件
    wx.onBackgroundAudioPlay(function (res) {

      var backgroundAudioManager = wx.getBackgroundAudioManager();
      var src = backgroundAudioManager.src;

      _this4.setData({
        currentTranslateVoice: src
      });
    });
  },
  /**
   * 设置语音识别历史记录
   */
  setHistory: function setHistory() {
    try {
      var dialogList = this.data.dialogList;
      dialogList.forEach(function (item) {
        item.autoPlay = false;
      });
      wx.setStorageSync('history', dialogList);
    } catch (e) {

      console.error("setStorageSync setHistory failed");
    }
  },
  /**
   * 得到历史记录
   */
  getHistory: function getHistory() {
    try {
      var history = wx.getStorageSync('history');
      if (history) {
        var len = history.length;
        var lastId = this.data.lastId;
        if (len > 0) {
          lastId = history[len - 1].id || -1;
        }
        this.setData({
          dialogList: history,
          toView: this.data.toView,
          lastId: lastId
        });
      }
    } catch (e) {
      // Do something when catch error
      this.setData({
        dialogList: []
      });
    }
  },
  /**
   * 重新滚动到底部
   */
  scrollToNew: function scrollToNew() {
    this.setData({
      toView: this.data.toView
    });
  },
  onShow: function onShow() {
    this.scrollToNew();

    this.initCard();

    if (this.data.recordStatus == 2) {
      wx.showLoading({
        // title: '',
        mask: true
      });
    }
  },
  onLoad: function onLoad() {
    var that = this;
    that.setData({
      openid: getApp().globalData.openid
    });
    if (that.data.openid == null) {
      wx.redirectTo({
        url: '/pages/home/index'
      });
    }
    this.getHistory();
    this.initRecord();
    this.setData({ toView: this.data.toView });
    app.getRecordAuth();
  },
  onHide: function onHide() {
    this.setHistory();
  }
});