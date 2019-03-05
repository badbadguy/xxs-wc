'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _props = require('../src/props.js');

var _props2 = _interopRequireDefault(_props);

var _date = require('../../libs/date.js');

var _date2 = _interopRequireDefault(_date);

var _objectToStyle = require('../../libs/objectToStyle.js');

var _objectToStyle2 = _interopRequireDefault(_objectToStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require('../../../moment/moment.js');

// console.log(moment('2018-3-11').weekday())
exports.default = Component({
  behaviors: [_props2.default],
  data: {
    weekPage: 0,
    monthsArray: [],
    oldItem: undefined,
    scrollTop: 0,
    oldRangeLeftItem: undefined,
    oldRangeRightItem: undefined,
    heightCount: 50,
    pageCount: 0
  },
  ready: function ready() {
    this.data.monthsArray.splice(0, this.data.monthsArray.length);
    var startMonthAnchor = void 0;
    var endMonthAnchor = void 0;
    if (isNaN(Number(this.data.dateRange[0]))) {
      // 字符串
      startMonthAnchor = this.data.dateRange[0] + '/01';
      endMonthAnchor = this.data.dateRange[1] + '/01';
    } else {
      startMonthAnchor = moment().subtract(this.data.dateRange[0], 'months').subtract(1, 'weeks').format('YYYY/MM/DD');
      endMonthAnchor = moment().add(this.data.dateRange[1] + 1, 'months').format('YYYY/MM/DD');
    }
    for (var i = 0;; i++) {
      // console.log(startMonthAnchor)
      var year = moment(startMonthAnchor).year();
      var month = moment(startMonthAnchor).month() + 1;
      var day = moment(startMonthAnchor).date();
      var startMonthDater = new _date2.default(year, month, day).weekDays; // Dater使用的是正常月
      // console.log(startMonthDater)
      var monthArray = this.getWeekArray(startMonthDater, i);
      monthArray.monthIndex = i;
      this.data.monthsArray.push(monthArray);
      if (moment(startMonthAnchor).isSame(endMonthAnchor, 'month')) {
        // 相同
        break;
      }
      startMonthAnchor = moment(startMonthAnchor).add(1, 'weeks').format('YYYY/MM/DD');
      // console.log(startMonthAnchor.format('YYYY-MM-DD'))
    }
    // console.log(weekDays)
    console.log(this.momentTransToItem(moment(this.data.value)));
    if (this.data.value) {
      var wIndex = this.momentTransToItem(moment(this.data.value)).weekIndex;
      var iIndex = this.momentTransToItem(moment(this.data.value)).itemIndex;
      this.data.monthsArray[wIndex].data[iIndex].isClicked = true;
      this.data.oldItem = this.data.monthsArray[wIndex].data[iIndex];

      this.setData({
        weekPage: wIndex
      });
    }
    // }, 3000);
    this.setData({
      monthsArray: this.data.monthsArray,
      monthTitleStyle: (0, _objectToStyle2.default)(this.data.monthTitleStyle),
      calendarWrapStyle: (0, _objectToStyle2.default)(this.calendarWrapStyleObj())
    });
    // let startMoment
    // if (this.data.startShow === 'today') {
    //   startMoment = moment()
    // } else {
    //   startMoment = moment(this.data.startShow)
    // }

    // this.selectRange(mIndex, dIndex)
    // }
    // for (let i = 0; i < this.data.monthsArray.length; i++) {
    //   if (this.itemTransToMoment(this.data.monthsArray[i]).isSame(startMoment, 'month')) {
    //     this.setData({
    //       scrollTop: this.data.monthsArray[i].positionY
    //     })
    //   }
    // }
  },

  methods: {
    changeHandler: function changeHandler(e) {
      e = e.detail.current;
      this.triggerEvent('weekchange', this.data.monthsArray[e].data[0].year + '/' + (this.data.monthsArray[e].data[0].month >= 10 ? '' : '0') + this.data.monthsArray[e].data[0].month + '/' + (this.data.monthsArray[e].data[0].day >= 10 ? '' : '0') + this.data.monthsArray[e].data[0].day);
    },
    calendarWrapStyleObj: function calendarWrapStyleObj() {
      var style = {};
      style.height = this.data.height + 'px';
      console.log(style);
      return style;
    },
    itemTransToMoment: function itemTransToMoment(item) {
      if (item.day) {
        return moment(item.year + '/' + item.month + '/' + item.day);
      } else {
        return moment(item.year + '/' + item.month);
      }
    },
    momentTransToItem: function momentTransToItem(moment) {
      for (var i = 0; i < this.data.monthsArray.length; i++) {
        for (var j = 0; j < this.data.monthsArray[i].data.length; j++) {
          if (moment.isSame(this.itemTransToMoment(this.data.monthsArray[i].data[j]))) {
            return this.data.monthsArray[i].data[j];
          }
        }
      }
    },
    inRangeSelect: function inRangeSelect(rightItem, startI, endI, select) {
      for (var i = startI; i <= endI; i++) {
        for (var j = 0; j < this.data.monthsArray[startI].data.length; j++) {
          // console.log(this.data.monthsArray[i].data[j])
          if (this.data.monthsArray[i].data[j].isThisMonth && this.itemTransToMoment(this.data.monthsArray[i].data[j]).isAfter(this.itemTransToMoment(this.data.oldRangeLeftItem), 'day') && this.itemTransToMoment(this.data.monthsArray[i].data[j]).isBefore(this.itemTransToMoment(rightItem), 'day')) {
            if (select) {
              this.data.monthsArray[i].data[j].isInRange = true;
            } else {
              this.data.monthsArray[i].data[j].isInRange = false;
            }
          }
          if (this.itemTransToMoment(this.data.monthsArray[i].data[j]).isSame(this.itemTransToMoment(rightItem), 'day')) {
            break;
          }
        }
      }
    },
    selectSingle: function selectSingle(mIndex, dIndex, selectItem) {
      if (this.data.oldItem) {
        this.data.oldItem.isClicked = false;
      }
      this.data.monthsArray[mIndex].data[dIndex].isClicked = true;
      this.data.oldItem = this.data.monthsArray[mIndex].data[dIndex];
      this.triggerEvent('changed', selectItem.value);
      // this.$emit('change', this.AnchorToDayString(this.timeAnchor))
    },
    touchStartHandler: function touchStartHandler(e) {
      // console.log(e)
      var mIndex = e.currentTarget.dataset.monthIndex;
      var dIndex = e.currentTarget.dataset.dayIndex;
      var selectItem = this.data.monthsArray[mIndex].data[dIndex];
      this.selectSingle(mIndex, dIndex, selectItem);
      this.setData({
        monthsArray: this.data.monthsArray
      });
      // this.data.monthsArray['monthIndex'].
      // e.currentTarget.dataset.item.isThisMonth = false
      // console.log(this.data.monthsArray)


      // console.log(this.data.monthsArray)
    },
    getWeekArray: function getWeekArray(date, monthIndex) {
      var weekArray = {};
      weekArray.data = [];
      for (var i = 0; i < date.data.length; i++) {
        var obj = {};
        obj.itemIndex = i;
        obj.day = date.data[i].day - 1;
        obj.month = date.data[i].month;
        obj.year = date.data[i].year;
        obj.isClicked = false;
        obj.weekIndex = this.data.pageCount;
        obj.value = obj.year + '/' + (obj.month < 10 ? '0' : '') + obj.month + '/' + (obj.day < 10 ? '0' : '') + obj.day;
        // console.log(moment(obj.value).weekday())
        if ([0, 6].indexOf(moment(obj.value).weekday()) !== -1) {
          obj.isHoliday = true;
        }
        weekArray.data.push(obj);
      }
      weekArray.pageIndex = this.data.pageCount;
      this.data.pageCount++;
      return weekArray;
    }
  }
});