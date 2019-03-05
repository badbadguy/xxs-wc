'use strict';

var _objectToStyle = require('./objectToStyle.js');

var _objectToStyle2 = _interopRequireDefault(_objectToStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Behavior({

  data: {
    sliderBarWrapStyle: ''
  },
  methods: {
    sliderBarWrapDynamicStyleObj: function sliderBarWrapDynamicStyleObj() {
      var style = {};
      style['z-index'] = this.data.zIndex;
      style['transform'] = 'translate3d(' + this.data.offsetX + 'px, 0, 0)';
      style.height = '30px';
      style.width = '30px';
      return style;
    }
  }
});