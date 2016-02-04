'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require("moment");

// Mozilla's polyfill for .find()
if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

var TimeSlotAllocator = function () {
  function TimeSlotAllocator() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, TimeSlotAllocator);
  }

  (0, _createClass3.default)(TimeSlotAllocator, [{
    key: 'isNotAvailable',
    value: function isNotAvailable(date, schedule) {

      var m = moment(date);

      var beginOfDay = moment(m).startOf('minute').startOf('second');

      var openHourFrom = moment(beginOfDay).hours(8).subtract(1, 'hours');
      var openHourTo = moment(beginOfDay).hours(20).add(1, 'hours');

      //console.log(`beginOfDay: ${beginOfDay.toISOString()}, openHourFrom: ${openHourFrom.toISOString()}, openHourTo: ${openHourTo.toISOString()}`);
      if (m.isBetween(openHourFrom, openHourTo)) {
        return schedule.find(function (item) {
          //console.log(`item: from: ${moment(item.from).toISOString()}, to: ${moment(item.to).toISOString()}`);
          return m.isBetween(moment(item.from).subtract(1, 'hours'), moment(item.to).add(1, 'hours'));
        });
      }
      return true;
    }

    /**
     * find the first appointment slot available
     *
     */

  }, {
    key: 'allocate',
    value: function allocate(schedule) {

      var m = moment().startOf('hour').startOf('minute').startOf('second').add(1, 'hours');

      for (; this.isNotAvailable(m, schedule); m.add(1, 'hours')) {}
      //console.log(`testing ${m.toISOString()}`);

      //console.log(`found ${m.toISOString()}`);
      return _promise2.default.resolve(m);

      var err = new Error('couldn\'t find a free slot within range');
      return _promise2.default.reject(err);
    }
  }]);
  return TimeSlotAllocator;
}();

var singletonInstance = new TimeSlotAllocator({});
var singletonMethod = function singletonMethod() {
  return singletonInstance.allocate.apply(singletonInstance, arguments);
};

module.exports = singletonMethod;
module.exports.default = singletonMethod;
module.exports.allocate = singletonMethod;
module.exports.timeSlotAllocator = singletonInstance;
module.exports.TimeSlotAllocator = TimeSlotAllocator;