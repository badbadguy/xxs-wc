'use strict';

var _objectToStyle = require('./objectToStyle.js');

var _objectToStyle2 = _interopRequireDefault(_objectToStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Behavior({

  data: {
    sliderBarWrapStyle: ''
  },
  methods: {
    sliderBarWrap2DynamicStyleObj: function sliderBarWrap2DynamicStyleObj() {
      var style = {};
      style['z-index'] = this.data.zIndex2;
      style['transform'] = 'translate3d(' + this.data.offset2X + 'px, 0, 0)';
      style.height = '30px';
      style.width = '30px';
      return style;
    }
  }
});