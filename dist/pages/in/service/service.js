"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {},
  gotowhere: function gotowhere(res) {
    switch (res.currentTarget.id) {
      case "translate":
        wx.navigateTo({
          url: '/pages/in/service/translate/translate'
        });
        break;
      case "2":
        wx.navigateTo({
          url: '/pages/in/service/exercises/exercises'
        });
        break;
      default:
        break;
    }
  }
});