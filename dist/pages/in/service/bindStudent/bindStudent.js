'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    list1: [],
    el: 'undefined',
    user_name: ''
  },
  onLoad: function onLoad(res) {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'user/bindStudent',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_name: that.data.user_name
      },
      success: function success(res) {
        that.setData({
          list1: res.data
        });
      }
    });
  },
  toSure: function toSure() {
    wx.showConfirm({
      title: '提示',
      content: '确认绑定吗',
      cancelColor: 'red',
      confirmColor: '#3399ff',
      confirmText: '确定',
      cancelText: '返回',
      success: function success(res) {
        console.log("确定绑定");
      }
    });
  },
  sure: function sure(index) {
    var index = index.target.dataset.idx;
    var that = this;
    console.log(that.data.list1[index].user_id);
    wx.request({
      url: getApp().globalData.headurl + 'user/updates',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_id: that.data.list1[index].user_id,
        student_status: 2
      },
      success: function success() {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        });
      }
    });
    this.data.list1.splice(index, 1);
    this.setData({
      list1: this.data.list1
    });
    this.setData({
      el: 'undefined'
    });
  },
  changeHandler1: function changeHandler1(res) {
    var index = res.currentTarget.dataset.index;
    if (this.data.el !== index) {
      if (this.data.el !== 'undefined') {
        this.data.list1[this.data.el].switcher = 'off';
      }
      this.data.list1[index].switcher = 'on';
      this.setData({
        list1: this.data.list1
      });
      this.data.el = index;
    }
  }
});