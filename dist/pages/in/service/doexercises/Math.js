'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var plugin = requirePlugin("WechatSI");
var manager = plugin.getRecordRecognitionManager();
var innerAudioContext = wx.createInnerAudioContext();
exports.default = Page({
  data: {
    subject_id: 'cd84a79d6ee04e4d9630731b25b589d0',
    title: '单选题',
    class_id: 'temp1',
    show3: 'show',
    isWrong: false,
    showq0: 'display:none',
    showq1: 'display:none',
    showq2: 'display:none',
    showq3: 'display:none',
    showPlay: 'display:none',
    question_title: '',
    select: [],
    selectValue: [],
    buttonsAn: false,
    buttons: {
      buttonText: '中文',
      lang: 'zh_CN',
      lto: 'en_US',
      msg: '长按说话',
      buttonType: 'normal'
    }
  },
  onLoad: function onLoad() {
    this.initRecord();
  },
  play: function play() {
    //开始播放
    innerAudioContext.play();
    //开始播放触发
    innerAudioContext.onPlay(function () {
      wx.showLoading({
        title: '播放录音中'
      });
    });
    //播放出错触发
    innerAudioContext.onError(function (res) {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
    //播放完成触发
    innerAudioContext.onEnded(function () {
      wx.hideLoading();
      wx.showModal({
        title: '提交答案',
        content: '请注意发音准确哦~',
        success: function success(res) {
          if (res.confirm) {
            console.log("触发提交");
          }
        }
      });
    });
  },
  /**
     * 按下按钮开始录音
     */
  streamRecord: function streamRecord(e) {
    this.setData({
      showPlay: 'display:none',
      buttonsAn: true
    });
    manager.start({
      lang: 'zh_CN'
    });
    wx.showLoading({
      title: '接收语音中'
    });
    console.log("按下");
    console.log(e);
  },


  /**
   * 松开按钮结束录音
   */
  endStreamRecord: function endStreamRecord(e) {
    wx.hideLoading();
    this.setData({
      buttonsAn: false
    });
    manager.stop();
    wx.showLoading({
      title: '加载语音中'
    });
  },

  /**
  * 初始化语音识别回调
  * 绑定语音播放开始事件
  */
  initRecord: function initRecord() {
    var _this = this;

    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = function (res) {
      console.log("有新的识别内容返回，则会调用此事件");
      _this.setData({
        showPlay: ''
      });
    };

    // 识别结束事件
    manager.onStop = function (res) {
      wx.hideLoading();
      innerAudioContext.src = res.tempFilePath;
      console.log(res);
    };

    // 识别错误事件
    manager.onError = function (res) {
      wx.hideLoading();
      wx.showToast({
        title: "识别错误，请重试！",
        icon: 'none'
      });
    };
  },

  sure: function sure() {
    var that = this;
    if (that.data.selectValue.length == 0) {
      wx.showToast({
        title: '请选择！',
        icon: 'none',
        duration: 3000
      });
      return;
    }
    wx.request({
      url: getApp().globalData.headurl + 'question/answer',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_id: 'tempUser',
        // user_id : getApp().globalData.openid,
        q: that.data.tempQ,
        answer: that.data.selectValue[0],
        QType: that.data.QType
        //缺homework_id
      },
      success: function success(res) {
        that.setData({
          selectValue: []
        });
        if (res.data.RorW == 0) {
          that.setData({
            question_remark: res.data.question_remark,
            isWrong: 'show'
          });
        } else {
          wx.showToast({
            title: '答对了哦！真棒~',
            icon: 'none',
            duration: 2000
          });
          that.onShow();
        }
      }
    });
  },
  change: function change(e) {
    this.setData({
      selectValue: e.detail.value
    });
  },
  openPopup5: function openPopup5(e) {
    var show = e.currentTarget.dataset.show;
    this.setData({
      isWrong: show
    });
  },
  handleShow5: function handleShow5() {
    this.setData({
      isWrong: false
    });
  },
  handleShow3: function handleShow3() {
    var that = this;
    that.setData({
      show3: false
    });
    that.binggo();
  },
  binggo: function binggo() {
    var that = this;
    if (that.data.q0_num > 0) {
      that.setData({
        showq0: '',
        showq1: 'display:none',
        showq2: 'display:none',
        showq3: 'display:none',
        title: '单选题'
      });
      return;
    }
    if (that.data.q1_num > 0) {
      that.setData({
        showq0: 'display:none',
        showq1: '',
        showq2: 'display:none',
        showq3: 'display:none',
        title: '语音题'
      });
      return;
    }
    if (that.data.q2_num > 0) {
      that.setData({
        showq0: 'display:none',
        showq1: 'display:none',
        showq2: '',
        showq3: 'display:none',
        title: '填空题'
      });
      return;
    }
    if (that.data.q3_num > 0) {
      that.setData({
        showq0: 'display:none',
        showq1: 'display:none',
        showq2: 'display:none',
        showq3: '',
        title: '应用题'
      });
      return;
    }
  },

  onShow: function onShow(res) {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'homework/selectNum',
      header: {
        'content-type': 'application/json'
      },
      data: {
        class_id: that.data.class_id,
        subject_id: that.data.subject_id,
        user_id: 'tempUser'
        // user_id : getApp().globalData.openid
      },
      success: function success(res) {
        var tempres = [res.data.q0_num, res.data.q1_num, res.data.q2_num, res.data.q3_num];
        var tempQ = null;
        for (var i = 0; i < tempres.length; i++) {
          if (tempres[i] > 0) {
            tempQ = "q" + i;
            break;
          }
        }
        var tempNum = parseInt(res.data.q0_num) + parseInt(res.data.q1_num) + parseInt(res.data.q2_num) + parseInt(res.data.q3_num);
        that.setData({
          q0_num: res.data.q0_num,
          q1_num: res.data.q1_num,
          q2_num: res.data.q2_num,
          q3_num: res.data.q3_num,
          tempNum: tempNum,
          num: res.data.num,
          tempQ: tempQ
        });
        if (tempNum <= 0) {
          wx.showModal({
            title: '哇塞',
            content: '已经没有作业了哦~',
            showCancel: false,
            success: function success(res) {
              console.log("跳转作业");
            }
          });
        }
        that.selectOne(tempQ);
        that.binggo();
      }
    });
  },
  selectOne: function selectOne(tempQ) {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'homework/selectOne',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_id: 'tempUser',
        // user_id : getApp().globalData.openid,
        q: tempQ
      },
      success: function success(data) {
        console.log(data);
        //单选题
        if (data.data.QType == "0") {
          that.setData({
            question_title: data.data.question_title,
            select: data.data.select,
            Qimg: data.data.question_image,
            QType: data.data.QType
          });
          console.log("单选题");
          return;
        }
        //语音题
        if (data.data.QType == "1") {
          that.setData({
            question_title: data.data.question_title,
            Qimg: data.data.question_image,
            QType: data.data.QType
          });
          console.log("语音题");
          return;
        }
        //填空题
        if (data.data.QType == "2") {
          that.setData({
            question_title: data.data.question_title,
            Qimg: data.data.question_image,
            QType: data.data.QType
          });
          console.log("填空题");
          return;
        } //应用题
        if (data.data.QType == "3") {
          that.setData({
            question_title: data.data.question_title,
            Qimg: data.data.question_image,
            QType: data.data.QType
          });
          console.log("应用题");
          return;
        }
      }
    });
  }
});