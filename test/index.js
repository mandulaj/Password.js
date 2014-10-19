var P = require('../index.js');

var s = new P("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

console.time('time');
console.log(s.wordStrong());
console.timeEnd('time');
