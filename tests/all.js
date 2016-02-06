const chai = require('chai');
chai.use(require('chai-fuzzy'));
const expect = chai.expect;
const assert = chai.assert;

const moment = require('moment');

const util = require('util');

// local functions
function pretty(obj) {
  return util.inspect(obj, false, 20, true)
};

const findFreeTimeSlot = require("../lib/find-free-time-slot");

describe('find-free-time-slot', function() {

  it("should plan a simple event", done => {
    const now = moment().startOf('hour');

    const schedule = [{
      from: moment(now).add(1, 'hours'),
      to: moment(now).add(2, 'hours')
    }, {
      from: moment(now).add(3, 'hours'),
      to: moment(now).add(4, 'hours')
    }, ];

    findFreeTimeSlot(schedule).then(evt => {
      console.log(`planned an event: ${JSON.stringify(evt)}`);
      done();
    }).catch(err => {
      console.log(`failed to plan an event: ${err}`);
      done();
    });
  })
})
