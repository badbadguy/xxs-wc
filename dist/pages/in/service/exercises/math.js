'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    checkbox: [],
    countryList: ['心算', '选择题', '应用题'],
    checklist: ['心算']
  },
  typechange: function typechange(e) {
    var that = this;
    switch (e.detail.value[0]) {
      case '心算':
        that.setData({
          showt: "",
          shows: "display:none",
          showp: "display:none",
          userType: 2
        });
        break;
      case '选择题':
        that.setData({
          showt: "display:none",
          shows: "",
          showp: "display:none",
          userType: 3
        });
        break;
      case '应用题':
        that.setData({
          showt: "display:none",
          shows: "display:none",
          showp: "",
          userType: 4
        });
        break;
      default:
        break;
    }
  },
  insert: function insert() {
    var cb = this.data.checkbox;
    console.log(cb);
    cb.push(this.data.checkbox.length);
    this.setData({
      checkbox: cb
    });
  },
  delBind: function delBind() {
    var cb = this.data.checkbox;
    console.log(cb);
    cb.pop(this.data.checkbox.length);
    this.setData({
      checkbox: cb
    });
  }
});