'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    list: [],
    openid: '',
    show1: false,
    show2: false,
    show3: false,
    ruserName: '',
    rleave_id: '',
    ruser_id: '',
    user_type: '3',
    accordionC: '',
    selectAAA: '',
    messageT: '',
    accordionValueC: []
  },
  getText: function getText(e) {
    this.setData({
      messageT: e.detail.value
    });
  },
  selectT: function selectT(e) {
    var that = this;
    var index = Number(e.detail.value[0]);
    that.setData({
      accordionC: that.data.accordionValueC[index].tid,
      selectAAA: index
    });
  },
  sureAddM: function sureAddM() {
    var that = this;
    if (that.data.accordionC == null || that.data.accordionC == '') {
      wx.showToast({
        title: "留言对象不能为空！请选择老师",
        icon: 'none'
      });
      return;
    } else if (that.data.messageT == null || that.data.messageT == '') {
      wx.showToast({
        title: "留言内容不能为空！",
        icon: 'none'
      });
      return;
    } else {
      wx.request({
        url: getApp().globalData.headurl + 'leave/add',
        header: {
          'content-type': 'application/json'
        },
        data: {
          user_id: that.data.openid,
          message: that.data.messageT,
          to_user_id: that.data.accordionC
        },
        success: function success(e) {
          that.setData({
            show1: false,
            accordionC: '',
            messageT: ''
          });
          that.onShow();
          wx.showToast({
            title: '留言成功',
            icon: 'success',
            duration: 2000
          });
        }
      });
    }
  },
  chooseT: function chooseT() {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'user/classTeacher',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_id: that.data.openid
      },
      success: function success(e) {
        that.setData({
          show3: true,
          accordionValueC: e.data
        });
      }
    });
  },
  changeC: function changeC(e) {
    this.setData({
      accordionValueC: e.detail.value
    });
  },
  sureT: function sureT() {
    this.setData({
      show3: false
    });
  },
  addM: function addM() {
    this.setData({
      show1: true
    });
  },
  submitForm: function submitForm(e) {
    console.log("submit", e);
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'leave/add',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_id: that.data.openid,
        link_leave_id: that.data.rleave_id,
        to_user_id: that.data.ruser_id,
        message: e.detail.value.comment
      },
      success: function success(res) {
        wx.showToast({
          title: '回复成功',
          icon: 'success',
          duration: 2000
        });
        that.onShow();
        that.handleShow2();
      }
    });
  },
  deleteComment: function deleteComment(e) {
    var leave_id = e.currentTarget.dataset.leave_id;
    console.log(leave_id);
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'leave/delete',
      header: {
        'content-type': 'application/json'
      },
      data: {
        leave_id: leave_id
      },
      success: function success() {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        });
        that.onShow();
      }
    });
  },
  cancleT: function cancleT() {
    this.setData({
      show3: false
    });
  },
  cancleM: function cancleM() {
    this.setData({
      show1: false
    });
  },
  handleShow2: function handleShow2() {
    this.setData({
      show2: false
    });
  },
  bindReply: function bindReply(e) {
    var that = this;
    var index = Number(e.currentTarget.dataset.index);
    var num = this.data.list[e.currentTarget.dataset.index].children.length;
    var leave_id = null;
    var ruserName = null;
    var ruser_id = null;
    if (num > 0) {
      leave_id = that.data.list[e.currentTarget.dataset.index].children[num - 1].leave_id;
      ruserName = that.data.list[e.currentTarget.dataset.index].children[num - 1].user_name;
      ruser_id = that.data.list[e.currentTarget.dataset.index].children[num - 1].user_id;
    } else {
      leave_id = that.data.list[e.currentTarget.dataset.index].leave_id;
      ruserName = that.data.list[e.currentTarget.dataset.index].user_name;
      ruser_id = that.data.list[e.currentTarget.dataset.index].user_id;
    }
    that.setData({
      show2: true,
      ruserName: ruserName,
      rleave_id: leave_id,
      ruser_id: ruser_id
    });
  },
  onLoad: function onLoad(e) {
    this.setData({
      openid: getApp().globalData.openid,
      user_type: e.user_type
    });
  },
  onShow: function onShow() {
    var that = this;
    wx.request({
      url: getApp().globalData.headurl + 'leave/select',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_id: getApp().globalData.openid
      },
      success: function success(res) {
        console.log(res);
        that.setData({
          list: res.data
        });
      }
    });
  }
});