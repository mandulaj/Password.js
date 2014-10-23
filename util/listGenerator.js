var fs = require('fs');

// Reads a input file and splits it at \n into a JSON list
fs.readFile('input.txt', {
  encoding: "ascii"
}, function(err, data) {
  if (err) throw err;
  var list = data.split("\n");
  fs.writeFile('output.json', JSON.stringify(list), function(err) {
    console.log("File Done");
  });
});