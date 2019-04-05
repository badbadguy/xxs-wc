'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {},
    onLoad: function onLoad(e) {
        var that = this;
        wx.request({
            url: getApp().globalData.headurl + 'user/selectAll',
            header: {
                'content-type': 'application/json'
            },
            data: {
                user_id: getApp().globalData.openid
            },
            success: function success(res) {
                that.setData({
                    class_id: res.data.returnMap.student_class
                });
            }
        });
    },
    onclick: function onclick(res) {
        var that = this;
        switch (res.currentTarget.id) {
            case "1":
                wx.navigateTo({
                    url: '/pages/in/service/doexercises/Math?subject_id=33018ef1b3b74a18b6d9f94bff995d79&class_id=' + that.data.class_id
                });
                break;
            case "2":
                wx.navigateTo({
                    url: '/pages/in/service/doexercises/Math?subject_id=cd84a79d6ee04e4d9630731b25b589d0&class_id=' + that.data.class_id
                });
                break;
            case "3":
                wx.navigateTo({
                    url: '/pages/in/service/doexercises/Math?subject_id=79bed2b0e57c4f7f8e71b9817f03e3b9&class_id=' + that.data.class_id
                });
                break;
            default:
                break;
        }
    }
});