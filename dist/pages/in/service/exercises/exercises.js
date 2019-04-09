"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {},
    onLoad: function onLoad(res) {
        var that = this;
        that.setData({
            teacher_subject: res.teacher_subject
        });
    },
    onclick: function onclick(res) {
        var that = this;
        switch (res.currentTarget.id) {
            case "1":
                wx.navigateTo({
                    url: '/pages/in/service/exercises/chinese?id=33018ef1b3b74a18b6d9f94bff995d79'
                });
                break;
            case "2":
                wx.navigateTo({
                    url: '/pages/in/service/exercises/math?id=79bed2b0e57c4f7f8e71b9817f03e3b9'
                });
                break;
            case "3":
                wx.navigateTo({
                    url: '/pages/in/service/exercises/english?id=cd84a79d6ee04e4d9630731b25b589d0'
                });
                break;
            default:
                break;
        }
    }
});