var moment = require('moment');

// var date = moment();
// date.add(1, 'year').subtract(7, 'months');
// console.log(date.format('MMM Do, YYYY'));
//Jan 1st 1970 00:00:00 am
// var date = new Date();
// console.log(date.getDate());

// --Challenge-- 00:19 am

var createdAt = 1234;
var time = moment(createdAt);       //if moment()--current time
console.log(time.format('h:mm a'));