"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//js
var list = [];
exports.default = Page({
  data: {
    openid: null,
    showt: "display:none",
    shows: "",
    showp: "display:none",
    addbutton: "display:none",
    userType: 3, //0:超级管理员 1:管理员 2:教师 3:学生 4:家长
    countryList: ['教师', '学生', '家长'],
    checklist5: ['学生'],
    multiArray: [['一年级', '二年级', '三年级'], ['一班', '二班', '三班']],
    objectMultiArray: [[{
      id: 0,
      name: '一年级'
    }, {
      id: 1,
      name: '二年级'
    }, {
      id: 2,
      name: '三年级'
    }], [{
      id: 0,
      name: '一班'
    }, {
      id: 1,
      name: '二班'
    }, {
      id: 2,
      name: '三班'
    }]],
    addclass: "",
    tempclass: "",
    addclsscn: "",
    multiIndex: [0, 0]
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