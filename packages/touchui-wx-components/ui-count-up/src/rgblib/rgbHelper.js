"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RGBHelper = exports.RGBHelper = function () {
  function RGBHelper() {
    _classCallCheck(this, RGBHelper);
  }

  _createClass(RGBHelper, null, [{
    key: "gradient",
    value: function gradient(startColor, endColor, step) {
      //将hex转换为rgb
      var sColor = hexToRgb(startColor);
      var eColor = hexToRgb(endColor);
      //计算R\G\B每一步的差值
      var rStep = (eColor[0] - sColor[0]) / step;
      var gStep = (eColor[1] - sColor[1]) / step;
      var bStep = (eColor[2] - sColor[2]) / step;

      var gradientColorArr = [];
      for (var i = 0; i < step; i++) {
        //计算每一步的hex值
        gradientColorArr.push(rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2])));
      }
      return gradientColorArr;
    }
  }]);

  return RGBHelper;
}();

function rgbToHex(r, g, b) {
  var hex = (r << 16 | g << 8 | b).toString(16);
  return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex;
}
function hexToRgb(hex) {
  var rgb = [];
  for (var i = 1; i < 7; i += 2) {
    rgb.push(parseInt("0x" + hex.slice(i, i + 2)));
  }
  return rgb;
}