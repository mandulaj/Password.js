Password.js
===========

Generate a password profile

This small utility helps one analyze the strength of a password using multiple methods. The methods include *dictionary matching, entropy complexity, character set size* and many more.

##Install
Using `npm`
```bash
  $ npm install password.js
```
```javascript
// index.js
var Password = require('password.js');

var passwd = new Password("secure-password123");
```
Using `bower`
```bash
  $ bower install password.js
```
```html
<script type="text/javascript" src="/path/to/bower_components/passwordjs/dist/password.js"></script>
<scipit>
var passwd = new Password("secure-password123");
</script>
```


##Known Issues:
* the function `wordStrong` crashes the node app with `Segmentation fault` message when large passwords are analyzed in `node 0.10.31`
