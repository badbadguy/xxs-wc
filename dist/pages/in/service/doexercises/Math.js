'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var plugin = requirePlugin("WechatSI");
var manager = plugin.getRecordRecognitionManager();
var innerAudioContext = wx.createInnerAudioContext();
exports.default = Page({
  data: {
    subject_id: '',
    title: '单选题',
    class_id: '',
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
    tempSelect3: [],
    kyb: []
  },
  onLoad: function onLoad(e) {
    var that = this;
    that.setData({
      class_id: e.class_id,
      subject_id: e.subject_id
    });
    this.initRecord();
  },
  input_an: function input_an(e) {
    var obj = {};
    obj = e.detail.value;
    var selectValue = [];
    selectValue.push(obj);
    this.setData({
      selectValue: selectValue
    });
  },

  play: function play() {
    var _this = this;

    //开始播放
    innerAudioContext.play();
    //开始播放触发
    innerAudioContext.onPlay(function () {
      wx.showLoading({
        title: '播放录音中',
        mask: true
      });
    });
    //播放出错触发
    innerAudioContext.onError(function (res) {});
    //播放完成触发
    innerAudioContext.onEnded(function () {
      var that = _this;
      wx.hideLoading();
      wx.showModal({
        title: '提交答案',
        content: '请注意发音准确哦~',
        success: function success(res) {
          if (res.confirm) {
            that.sentAnswer();
          }
        }
      });
    });
  },
  /**
     * 按下按钮开始录音
     */
  streamRecord: function streamRecord(e) {
    wx.showLoading({
      title: '接收语音中'
    });
    this.setData({
      showPlay: 'display:none',
      buttonsAn: true,
      selectValue: []
    });
    if (this.data.subject_id == '79bed2b0e57c4f7f8e71b9817f03e3b9') {
      manager.start({
        lang: 'en_US'
      });
    } else {
      manager.start({
        lang: 'zh_CN'
      });
    }
  },


  /**
   * 松开按钮结束录音
   */
  endStreamRecord: function endStreamRecord(e) {
    wx.hideLoading();
    this.setData({
      buttonsAn: false
    });
    wx.showLoading({
      title: '加载语音中',
      mask: true
    });
    manager.stop();
  },

  /**
  * 初始化语音识别回调
  * 绑定语音播放开始事件
  */
  initRecord: function initRecord() {
    var _this2 = this;

    // 识别结束事件
    manager.onStop = function (res) {
      if (res.result != "") {
        wx.hideLoading();
        innerAudioContext.src = res.tempFilePath;
        var obj = {};
        obj = res.result;
        var selectValue = [];
        selectValue.push(obj);
        _this2.setData({
          selectValue: selectValue,
          showPlay: ''
        });
      } else {
        wx.showToast({
          title: '没听清楚你说什么呢~',
          icon: 'none',
          duration: 3000,
          image: '/imgs/service/noListen.gif'
        });
      }
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
        title: '不能交白卷哦！~',
        icon: 'none',
        duration: 3000
      });
      return;
    }
    that.sentAnswer();
  },
  sure3: function sure3(e) {
    var that = this;
    if (that.data.tempSelect3[e.currentTarget.id] == null) {
      wx.showToast({
        title: '不能交白卷哦！~',
        icon: 'none',
        duration: 3000
      });
      return;
    }
    var wori = "kyb[" + e.currentTarget.id + "]";
    this.setData(_defineProperty({}, wori, 1));
    if (that.data.tempSelect3[e.currentTarget.id]) {
      wx.showToast({
        title: '答对了哦！真棒~\r\n往下拉吧~',
        icon: 'none',
        duration: 2000
      });
    } else {
      var wrongMessage = that.data.QList[e.currentTarget.id].question_remark;
      that.setData({
        question_remark: wrongMessage,
        isWrong: 'show'
      });
    }
    if (e.currentTarget.id == that.data.select3.length - 1) {
      var tempQID;
      var tempRorW = 0;
      for (var i = 0; i < that.data.tempSelect3.length; i++) {
        if (!that.data.tempSelect3[i]) {
          tempQID = that.data.QList[0].question_id;
          tempRorW = 1;
          break;
        }
      }
      wx.request({
        url: getApp().globalData.headurl + 'question/xigua',
        header: {
          'content-type': 'application/json'
        },
        data: {
          user_id: getApp().globalData.openid,
          q: that.data.tempQ,
          homework_id: that.data.homework_id,
          question_id: tempQID,
          RorW: tempRorW
        },
        success: function success(res) {
          that.setData({
            tempSelect3: [],
            kyb: []
          });
          setTimeout(function () {
            that.onShow();
          }, 500);
        }
      });
    }
  },
  sentAnswer: function sentAnswer() {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'question/answer',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_id: getApp().globalData.openid,
        q: that.data.tempQ,
        answer: that.data.selectValue[0],
        QType: that.data.QType,
        homework_id: that.data.homework_id
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
        }
        that.onShow();
      }
    });
  },
  change: function change(e) {
    this.setData({
      selectValue: e.detail.value
    });
  },
  change3: function change3(e) {
    var that = this;
    var tempIndex;
    for (var i = 0; i < 4; i++) {
      if (that.data.select3[e.target.id][i].key == e.detail.value) {
        tempIndex = i;
      }
    }
    var temp = this.data.select3[e.target.id][tempIndex];
    var wori = "tempSelect3[" + e.target.id + "]";
    var dcqs = temp.RorF;
    this.setData(_defineProperty({}, wori, dcqs));
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
        user_id: getApp().globalData.openid
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
          tempQ: tempQ,
          homework_id: res.data.homework_id
        });
        if (tempNum <= 0) {
          wx.showModal({
            title: '哇塞',
            content: '已经没有作业了哦~',
            showCancel: false,
            success: function success(res) {
              wx.navigateBack({
                delta: 1
              });
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
        user_id: getApp().globalData.openid,
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
          return;
        }
        //语音题
        if (data.data.QType == "1") {
          that.setData({
            question_title: data.data.question_title,
            Qimg: data.data.question_image,
            QType: data.data.QType
          });
          return;
        }
        //填空题
        if (data.data.QType == "2") {
          that.setData({
            question_title: data.data.question_title,
            Qimg: data.data.question_image,
            QType: data.data.QType
          });
          return;
        } //应用题
        if (data.data.QType == "3") {
          that.setData({
            question_title: data.data.question_title,
            Qimg: data.data.question_image,
            QType: data.data.QType,
            QList: data.data.Qlist,
            select3: data.data.select3
          });
          return;
        }
      }
    });
  }
});