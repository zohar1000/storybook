const dayjs = require('dayjs');

const date = new Date();
const offset = date.getTimezoneOffset();
const offsetMs = offset * 60_000;
console.log('offset:', offset);

console.log('toString:', date.toString());
console.log('Date.now():', Date.now());
// console.log('Date.toLocaleString():', date.toLocaleString());

const d = dayjs(date.toString());
const valueOf = d.valueOf() - offsetMs;
console.log('valueOf:', valueOf);
const d2 = dayjs(valueOf);
console.log('d2:', d2.toString(), d2.year(), d2.month(), d2.date());

const localTime = dayjs(d);
// console.log('localTime:', localTime);
const startDay = localTime.subtract(10, 'day');
console.log('startDay:', startDay.toString());
console.log('startDay:', startDay.format());
console.log('startDay:', startDay.year(), startDay.month(), startDay.date());
const startTime = `${startDay.year()}-${startDay.month() + 1}-${startDay.date()}T00:00:00Z+2.00`;
console.log('startTime:', startTime);
const endDay = localTime.add(2, 'day');
const endTime = `${endDay.year()}-${endDay.month() + 1}-${endDay.date()}T00:00:00Z+2.00`;
console.log('endTime:', endTime);

