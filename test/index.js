var P = require('../index.js');

var s = new P("password@");

console.time('time');
console.log(s.getEntropy());
console.timeEnd('time');
