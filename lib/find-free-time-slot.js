'use strict';

const moment = require("moment");

// Mozilla's polyfill for .find()
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
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

class TimeSlotAllocator {
  constructor() {
  }

  isNotAvailable(date, schedule) {

    const m = moment(date);

    const beginOfDay = moment(m).startOf('minute').startOf('second');

    const openHourFrom = moment(beginOfDay).hours(8).subtract(1, 'hours');
    const openHourTo = moment(beginOfDay).hours(20).add(1, 'hours');

    //console.log(`beginOfDay: ${beginOfDay.toISOString()}, openHourFrom: ${openHourFrom.toISOString()}, openHourTo: ${openHourTo.toISOString()}`);
    if (m.isBetween(openHourFrom, openHourTo)) {
      return schedule.find(item => {
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
  find(schedule) {

    let m = moment().startOf('hour').startOf('minute').startOf('second').add(1, 'hours');

    for (; this.isNotAvailable(m, schedule); m.add(1, 'hours')) {
      //console.log(`testing ${m.toISOString()}`);
    }

    //console.log(`found ${m.toISOString()}`);
    return Promise.resolve(m);

    const err = new Error(`couldn't find a free slot within range`);
    return Promise.reject(err);
  }
}


const singletonInstance = new TimeSlotAllocator({})
const singletonMethod = function() {
  return singletonInstance.find.apply(singletonInstance, arguments);
}

module.exports = singletonMethod
module.exports.default = singletonMethod
module.exports.find = singletonMethod
module.exports.timeSlotAllocator = singletonInstance
module.exports.TimeSlotAllocator = TimeSlotAllocator
