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
  toSure: function toSure(e) {
    var that = this;
    console.log(e.currentTarget.id);
    wx.showConfirm({
      title: '提示',
      content: '确认与 ' + that.data.list1[e.currentTarget.id].user_name + ' 同学绑定吗',
      cancelColor: 'red',
      confirmColor: '#3399ff',
      confirmText: '确定',
      cancelText: '返回',
      success: function success(res) {
        that.data.list1[e.currentTarget.id].switcher = 'off';
        if (res.confirm) {
          that.sure(e.currentTarget.id);
        } else {
          that.setData({
            el: 'undefined',
            list1: that.data.list1
          });
        }
      }
    });
  },
  sure: function sure(index) {
    var that = this;
    console.log(that.data.list1[index].user_id);
    wx.request({
      url: getApp().globalData.headurl + 'user/updatep',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_id: getApp().globalData.openid,
        children_id: that.data.list1[index].user_id
      },
      success: function success() {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        });
        wx.switchTab({
          url: '/pages/in/service/service'
        });
      }
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