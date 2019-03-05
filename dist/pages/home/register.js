'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//js
var list = [];
exports.default = Page({
  data: {
    showtest: false,
    datatest: [],
    titletest: "请选择",

    openid: null,
    showt: "display:none",
    shows: "",
    showp: "display:none",
    addbutton: "display:none",
    userType: 3, //0:超级管理员 1:管理员 2:教师 3:学生 4:家长
    countryList: ['教师', '学生', '家长'],
    checklist5: ['学生'],
    multiArray: [],
    objectMultiArray: [],
    addclass: "",
    tempclass: "",
    addclsscn: "",
    multiIndex: [0, 0]
  },

  onReady: function onReady() {
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    this.setData({
      datatest: [{
        name: '美食',
        value: 'food',
        children: [{
          name: '火锅',
          value: 'chafing dish',
          children: [{ name: '川味火锅', value: 'SiChuan chafing dish' }, { name: '老北京火锅', value: 'Beijing chafing dish' }, { name: '牛肉火锅', value: 'Beef chafing dish' }]
        }, {
          name: '西餐',
          value: 'western food',
          children: [{ name: '意大利菜', value: 'Italy food' }, { name: '法国菜', value: 'France food' }, { name: '汉堡', value: 'Hamburg' }]
        }]
      }, {
        name: '旅游',
        value: 'tour',
        children: [{
          name: '周边游',
          value: 'tour around',
          children: [{ name: '景点', value: 'Scenic spot' }, { name: '公园', value: 'Park' }, { name: '名胜古迹', value: 'Historical sites' }]
        }, {
          name: '海外游',
          value: 'tour aboard',
          children: [{ name: '美国游', value: 'American tour' }, { name: '欧洲游', value: 'Europe tour' }, { name: '东南亚游', value: 'Southease Asia tour' }]
        }]
      }, {
        name: '旅游',
        value: 'tour',
        children: [{
          name: '周边游',
          value: 'tour around',
          children: [{ name: '景点', value: 'Scenic spot' }, { name: '公园', value: 'Park' }, { name: '名胜古迹', value: 'Historical sites' }]
        }, {
          name: '海外游',
          value: 'tour aboard',
          children: [{ name: '美国游', value: 'American tour' }, { name: '欧洲游', value: 'Europe tour' }, { name: '东南亚游', value: 'Southease Asia tour' }]
        }]
      }, {
        name: '旅游',
        value: 'tour',
        children: [{
          name: '周边游',
          value: 'tour around',
          children: [{ name: '景点', value: 'Scenic spot' }, { name: '公园', value: 'Park' }, { name: '名胜古迹', value: 'Historical sites' }]
        }, {
          name: '海外游',
          value: 'tour aboard',
          children: [{ name: '美国游', value: 'American tour' }, { name: '欧洲游', value: 'Europe tour' }, { name: '东南亚游', value: 'Southease Asia tour' }]
        }]
      }]
    });
  },
  handleselectedtest: function handleselected1(e) {
    var data = e.detail;
    this.data.titletest = "";
    for (var i = 0; i < data.length; i++) {
      this.data.titletest += data[i].name + ' ';
    }
    this.setData({
      showtest: false,
      titletest: this.data.titletest
    });
  },
  showPoptest: function showPop1() {
    this.setData({
      showtest: true
    });
  },

  delclassx: function delclassx(e) {
    this.setData({
      addclass: "",
      addclsscn: ""
    });
  },
  addclassx: function addclassx(e) {
    var that = this;
    this.setData({
      addclass: that.data.addclass + that.data.tempclass + "~"
    });
    var i = 0;
    var tempaddclass = "";
    for (; i < that.data.addclass.split("~").length - 1; i++) {
      var tempgrape = that.data.addclass.split("~")[i].split(",")[0];
      var tempgrapec = "";
      switch (parseInt(tempgrape)) {
        case 0:
          tempgrapec = "一";break;
        case 1:
          tempgrapec = "二";break;
        case 2:
          tempgrapec = "三";break;
        case 3:
          tempgrapec = "四";break;
        case 4:
          tempgrapec = "五";break;
        case 5:
          tempgrapec = "六";break;
      };
      var tempclass = that.data.addclass.split("~")[i].split(",")[1];
      var tempclassc = "";
      switch (parseInt(tempclass)) {
        case 0:
          tempclassc = "一";break;
        case 1:
          tempclassc = "二";break;
        case 2:
          tempclassc = "三";break;
        case 3:
          tempclassc = "四";break;
        case 4:
          tempclassc = "五";break;
        case 5:
          tempclassc = "六";break;
      };
      tempaddclass += tempgrapec + "年级" + tempclassc + "班  ";
    }
    this.setData({
      addclsscn: tempaddclass
    });
    console.log(that.data.addclsscn);
  },
  bindMultiPickerChange: function bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      multiIndex: e.detail.value,
      tempclass: e.detail.value,
      addbutton: ""
    });
  },
  bindMultiPickerColumnChange: function bindMultiPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['一班', '二班', '三班'];
            break;
          case 1:
            data.multiArray[1] = ['一班', '二班', '三班'];
            break;
          case 2:
            data.multiArray[1] = ['一班', '二班', '三班'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },
  onLoad: function onLoad(res) {
    var that = this;
    var tempx = [];
    var tempxx = [];
    wx.request({
      url: 'http://localhost:9999/class/checkclass',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function success(res) {
        console.log(res);
        var tempn = "";
        var tempb = "";
        for (var i = 0; i >= res.data.resultList.length; i++) {
          switch (parseInt(res.data.resultList[i].name)) {
            case 0:
              tempn = "一";break;
            case 1:
              tempn = "二";break;
            case 2:
              tempn = "三";break;
            case 3:
              tempn = "四";break;
            case 4:
              tempn = "五";break;
            case 5:
              tempn = "六";break;
          }
          switch (parseInt(res.data.data[i].name)) {
            case 0:
              tempb = "一";break;
            case 1:
              tempb = "二";break;
            case 2:
              tempb = "三";break;
            case 3:
              tempb = "四";break;
            case 4:
              tempb = "五";break;
            case 5:
              tempb = "六";break;
          }
          that.setData({
            multiArray: []
          });
        }
        that.setData({
          objectMultiArray: [res.data.resultList, res.data.data],
          multiArray: []
        });
      }
    });
    this.setData({
      openid: res.openid,
      show1: ""
    });
  },
  typechange: function typechange(e) {
    if (e.type != "change") return;
    if (e.detail.value[0] == '教师') {
      this.setData({
        userType: 2,
        showt: "",
        shows: "display:none",
        showp: "display:none"
      });
    }
    if (e.detail.value[0] == '学生') {
      this.setData({
        userType: 3,
        showt: "display:none",
        shows: "",
        showp: "display:none"
      });
    }
    if (e.detail.value[0] == '家长') {
      this.setData({
        userType: 4,
        showt: "display:none",
        shows: "display:none",
        showp: ""
      });
    }
  }
});