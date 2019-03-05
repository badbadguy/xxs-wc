'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StyleHelper = require('../../libs/StyleHelper.js');

var _StyleHelper2 = _interopRequireDefault(_StyleHelper);

var _rgbHelper = require('../src/rgblib/rgbHelper.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { tween } from 'shifty'
exports.default = Component({
  properties: {
    from: {
      type: [Number, String]
    },
    to: {
      type: [Number, String]
    },
    duration: {
      type: [Number, String],
      value: 1000
    },
    fromColor: {
      type: String,
      value: '#000000'
    },
    toColor: {
      type: String,
      value: '#000000'
    },
    numberStyle: {
      type: [Object, String],
      value: ''
    },
    fixed: {
      type: [Number, String],
      value: 0
    },
    digit: {
      type: [Number, String],
      value: 0
    }
  },
  data: {
    showNum: '',
    num: 0,
    time: 0,
    color: '',
    selfNumberStyle: '',
    tick: 0
  },
  created: function created() {},
  detached: function detached() {
    if (this.data.interval) {
      clearInterval(this.data.interval);
    }
  },
  attached: function attached() {
    this.data.selfDigit = Number(this.data.digit);

    this.data.selfNumberStyle = _StyleHelper2.default.getPlainStyle(this.data.numberStyle);

    this.data.selfFrom = Number(this.data.from);
    this.data.selfTo = Number(this.data.to);
    this.data.tick = this.data.duration / (this.data.selfTo - this.data.selfFrom);
    if (this.data.tick < 20) {
      this.data.multi = 20 / this.data.tick;
      this.data.tick = 20;
    } else {
      this.data.multi = 1 + 0.01;
    }
    this.data.tick = Math.floor(this.data.tick);
    this.data.gradientArray = _rgbHelper.RGBHelper.gradient(this.data.fromColor, this.data.toColor, Math.floor((this.data.selfTo - this.data.selfFrom) / this.data.multi));
    this.data.num = Math.floor(this.data.selfFrom);
    this.setData({
      num: this.data.num,
      selfNumberStyle: this.data.selfNumberStyle
    });
  },
  ready: function ready() {
    var _this = this;

    var i = 0;
    this.data.interval = setInterval(function () {
      _this.data.num = _this.data.multi + _this.data.num;
      if (_this.data.num >= _this.data.selfTo) {
        clearInterval(_this.data.interval);
        _this.data.num = _this.data.selfTo;
        _this.data.showNum = Number(_this.data.num).toFixed(_this.data.fixed);
        _this.zeroAlign();
        _this.setData({
          showNum: _this.data.showNum
        });
        _this.setData({
          num: _this.data.num,
          color: _this.data.gradientArray[_this.data.gradientArray.length - 1]
        });
        return;
      }
      if (_this.data.gradientArray[i]) {
        _this.setData({
          color: _this.data.gradientArray[i]
        });
      }
      _this.data.showNum = Number(_this.data.num).toFixed(_this.data.fixed);
      _this.zeroAlign();
      _this.setData({
        showNum: _this.data.showNum
      });
      i++;
    }, this.data.tick);
  },

  methods: {
    zeroAlign: function zeroAlign() {
      var digit = this.data.showNum.split('.')[0].length;
      if (this.data.selfDigit && this.data.selfDigit > digit) {
        var zeroNumber = this.data.selfDigit - digit;
        this.data.showNum = Math.pow(10, zeroNumber).toString().split('1')[1] + this.data.showNum;
      }
    }
  }
});