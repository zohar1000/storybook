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
console.log('d2:', d2.toString());
