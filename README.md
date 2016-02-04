# @datagica/find-free-time-slot

Find a free time slot in a tight schedule

## Installation

    $ npm install --save @datagica/find-free-time-slot

## Usage

```javascript
import findFreeTimeSlot from "@datagica/find-free-time-slot";

findFreeTimeSlot(DATA).then(result => {
  console.log("result: ", result)
}).catch(err => {
  console.log("invalid input data: "+err)
})
```

## Examples

```javascript
{
import findFreeTimeSlot from "@datagica/find-free-time-slot";

findFreeTimeSlot([
 {
   from: moment(now).add(1, 'hours'),
   to: moment(now).add(2, 'hours')
 },
 {
   from: moment(now).add(3, 'hours'),
   to: moment(now).add(4, 'hours')
 }
]).then(..).catch(..)
// will output the next date matching, for instance:
"2016-02-05T07:00:00.000Z"
```
