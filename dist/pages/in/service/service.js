"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {},
  gotowhere: function gotowhere(res) {
    switch (res.currentTarget.id) {
      case "1":
        wx.navigateTo({
          url: '/pages/in/service/translate/translate'
        });
        break;
      case "2":
        wx.navigateTo({
          url: '/pages/in/service/ranking/ranking'
        });
        break;
      case "3":
        wx.navigateTo({
          url: '/pages/in/service/decorate/decorate'
        });
        break;
      case "4":
        wx.navigateTo({
          url: '/pages/in/service/showexer/showexer'
        });
        break;
      case "5":
        wx.navigateTo({
          url: '/pages/in/service/doexercises/select'
        });
        break;
      case "6":
        wx.navigateTo({
          url: '/pages/in/service/checkWrong/checkkWrong'
        });
      case "7":
        wx.navigateTo({
          url: '/pages/in/service/sureStudent/sureStudent'
        });
        break;
      case "8":
        wx.navigateTo({
          url: '/pages/in/service/exercises/exercises'
        });
        break;
      default:
        break;
    }
  }
});