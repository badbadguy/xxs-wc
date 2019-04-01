'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    subject_id: 'cd84a79d6ee04e4d9630731b25b589d0',
    title: '单选题',
    class_id: 'temp1',
    show3: 'show',
    showq0: 'display:none',
    showq1: 'display:none',
    showq2: 'display:none',
    showq3: 'display:none',
    question_title: '',
    select: [],
    selectValue: []
  },
  sure: function sure() {
    var that = this;
    if (that.data.selectValue.length == 0) {
      wx.showToast({
        title: '请选择！',
        icon: 'none',
        duration: 1000
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
        answer: that.data.selectValue[0]
      },
      success: function success(res) {
        console.log(res);
      }
    });
  },
  change: function change(e) {
    this.setData({
      selectValue: e.detail.value
    });
  },
  handleShow3: function handleShow3() {
    var that = this;
    that.setData({
      show3: false
    });
    if (that.data.q0_num > 0) {
      that.setData({
        showq0: '',
        title: '单选题'
      });
      return;
    }
    if (that.data.q1_num > 0) {
      that.setData({
        showq1: '',
        title: '语音题'
      });
      return;
    }
    if (that.data.q2_num > 0) {
      that.setData({
        showq2: '',
        title: '填空题'
      });
      return;
    }
    if (that.data.q3_num > 0) {
      that.setData({
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
            that.setData({
              question_title: data.data.question_title,
              select: data.data.select
            });
          }
        });
        that.setData({
          q0_num: res.data.q0_num,
          q1_num: res.data.q1_num,
          q2_num: res.data.q2_num,
          q3_num: res.data.q3_num,
          num: res.data.num,
          tempQ: tempQ
        });
      }
    });
  }
});