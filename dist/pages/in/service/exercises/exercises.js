'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        menuitems: []
    },
    onLoad: function onLoad(res) {
        var that = this;
        wx.request({
            url: getApp().globalData.headurl + 'subject/select',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function success(res) {
                console.log(res.data.resultList);
                that.setData({
                    menuitems: res.data.resultList
                });
            }
        });
    },
    onclick: function onclick(res) {
        var that = this;
        switch (res.currentTarget.id) {
            case "1":
                wx.navigateTo({
                    url: '/pages/in/service/exercises/chinese'
                });
                break;
            case "2":
                wx.navigateTo({
                    url: '/pages/in/service/exercises/math'
                });
                break;
            case "3":
                wx.navigateTo({
                    url: '/pages/in/service/exercises/english'
                });
                break;
            default:
                break;
        }
    }
});