'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//js
exports.default = Page({
  data: {
    openid: null,
    showt: true,
    shows: false,
    showp: true,
    userType: 3, //0:超级管理员 1:管理员 2:教师 3:学生 4:家长
    countryList: ['教师', '学生', '家长'],
    checklist5: ['学生']
  },
  onLoad: function onLoad(res) {
    console.log(res.openid);
    this.setData({
      openid: res.openid
    });
  },
  typechange: function typechange(e) {
    console.log(e);
    if (e.detail.value[0] == '教师') {
      var that = this;
      this.data.userType = 2;
      this.data.showt = false;
      this.data.shows = true;
      this.data.showp = true;
      console.log(that);
      console.log("教师" + this.data.userType);
    }
    if (e.detail.value[0] == '学生') {
      this.data.userType = 3;
      this.data.showt = true;
      this.data.shows = false;
      this.data.showp = true;
      console.log(this.data.showt);
      console.log(this.data.shows);
      console.log(this.data.showp);
      console.log("学生" + this.data.userType);
    }
    if (e.detail.value[0] == '家长') {
      this.data.userType = 4;
      this.data.showt = true;
      this.data.shows = true;
      this.data.showp = false;
      console.log(this.data.showt);
      console.log(this.data.shows);
      console.log(this.data.showp);
      console.log("家长" + this.data.userType);
    }
  }
});