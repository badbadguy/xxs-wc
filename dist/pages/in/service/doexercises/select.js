"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {},
    onLoad: function onLoad(res) {
        var that = this;
    },
    onclick: function onclick(res) {
        var that = this;
        switch (res.currentTarget.id) {
            case "1":
                wx.navigateTo({
                    url: '/pages/in/service/doexercises/Chinese'
                });
                break;
            case "2":
                wx.navigateTo({
                    url: '/pages/in/service/doexercises/Math'
                });
                break;
            case "3":
                wx.navigateTo({
                    url: '/pages/in/service/doexercises/English'
                });
                break;
            default:
                break;
        }
    }
});