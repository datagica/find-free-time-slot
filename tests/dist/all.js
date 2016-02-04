'use strict';

var _findFreeTimeSlot = require('../../lib/find-free-time-slot');

var _findFreeTimeSlot2 = _interopRequireDefault(_findFreeTimeSlot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = require('chai');
chai.use(require('chai-fuzzy'));
var expect = chai.expect;
var assert = chai.assert;

var moment = require('moment');

var util = require('util');

// local functions
function pretty(obj) {
  return util.inspect(obj, false, 20, true);
};

describe('find-free-time-slot', function () {

  it("should plan a simple event", function (done) {
    var now = moment().startOf('hour');

    var schedule = [{
      from: moment(now).add(1, 'hours'),
      to: moment(now).add(2, 'hours')
    }, {
      from: moment(now).add(3, 'hours'),
      to: moment(now).add(4, 'hours')
    }];

    (0, _findFreeTimeSlot2.default)(schedule).then(function (evt) {
      console.log('planned an event: ' + JSON.stringify(evt));
      done();
    }).catch(function (err) {
      console.log('failed to plan an event: ' + err);
      done();
    });
  });
});