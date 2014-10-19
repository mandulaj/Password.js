var P = require('../index.js');

var s = new P("SeCrEtP@sswrd13_51");

console.time('time');
console.log(s.wordStrong());
console.timeEnd('time');
