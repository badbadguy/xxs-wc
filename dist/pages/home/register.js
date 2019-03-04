'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//js
var list = [];
exports.default = Page({
  properties: {
    chooseList: {
      type: Array
    },
    multiple: {
      type: Boolean
    }
  }, methods: {
    // 点击picker元素事件	
    chooseItem: function chooseItem(e) {
      if (this.properties.multiple) {
        // 多选事件
        var val = e.target.dataset.value;
        var arr = this.data.chooseList;
        var flag = '';
        var index = null;
        for (var i = 0, len = arr.length; i < len; i++) {
          if (arr[i].value == val) {
            index = i;
            flag = 'chooseList[' + i + '].flag';
          }
        }
        if (!this.data.chooseList[index].flag) {
          this.setData(_defineProperty({}, flag, true));
        } else {
          this.setData(_defineProperty({}, flag, false));
        }
      } else {
        // 单选事件
        var _val = e.target.dataset.value;
        var _arr = this.data.chooseList;
        var _flag = '';
        var _index = null;
        for (var _i = 0, _len = _arr.length; _i < _len; _i++) {
          _index = _i;
          _flag = 'chooseList[' + _i + '].flag';
          if (_arr[_i].value == _val) {
            this.setData(_defineProperty({}, _flag, true));
          } else {
            this.setData(_defineProperty({}, _flag, false));
          }
        }
      }
    },

    // 展示picker
    showPicker: function showPicker() {
      if (!this.data.firstShow) {
        this.setData({
          firstShow: true
        });
      }
      this.setData({
        showPicker: true
      });
      // 加载时重新渲染已选择元素
      var arr = this.data.chooseList;
      var array = this.data.list;
      var flag = '';
      var index = null;
      for (var i = 0, len = arr.length; i < len; i++) {
        index = i;
        flag = 'chooseList[' + i + '].flag';
        if (!array.includes(arr[i].value)) {
          this.setData(_defineProperty({}, flag, false));
        } else {
          this.setData(_defineProperty({}, flag, true));
        }
      }
    },

    // 隐藏picker
    hidePicker: function hidePicker() {
      this.setData({
        showPicker: false
      });
    },

    // 取消按钮事件
    cancal: function cancal() {
      this.hidePicker();
    },

    // 确定按钮事件
    sure: function sure() {
      list = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.data.chooseList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.flag) {
            list.push(item.value);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.setData({
        list: list
      });
      this.hidePicker();
      this.triggerEvent('chooseEvent', {
        chooseArray: this.data.list
      });
    }
  },
  data: {
    showPicker: false,
    firstShow: false,
    list: [],

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
  addclassx: function addclassx(e) {
    var that = this;
    this.setData({
      addclass: that.data.addclass + that.data.tempclass + "~"
    });
    var i = 0;
    for (; i < that.data.addclass.split("~").length - 1; i++) {
      console.log(i);
      this.setData({
        addclsscn: that.data.addclsscn + that.data.addclass.split("~")[i].split(",")[0] + 1 + "年级" + that.data.addclass.split("~")[i].split(",")[1] + 1 + "班级"
      });
    }
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