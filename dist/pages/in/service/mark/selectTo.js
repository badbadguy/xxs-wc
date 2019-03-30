'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {},
  onLoad: function onLoad(res) {
    console.log(res);
    var that = this;
    that.setData({
      subjectId: res.subjectId,
      value0: res.value0,
      value1: res.value1,
      value2: res.value2,
      value3: res.value3
    });
  }
});