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

##Usage
```javascript
var Password = require('password.js');

// create a new Password object
var passwd = new Password("secure-password123",{
  commonWords:[ // list of common words that we want to avoid using
    "123456",
    "password",
    "admin",
    "3.14159265"
  ],
  minWordDistance: 4, // the minimal acceptable distance between password and any word in commonWords
  complexity: 9 // on a scale 1-10 how complex do we expect the password to be
}, function(data){
  // any time we update the password we want to get a new password profile and print it
  console.log(data);
});

// update the password and print it's profile
passwd.update("aMuChBe11erPa$$worD");

// print the password entropy
console.log(passwd.getEntropy());
```


##Known Issues:
* the function `wordStrong` crashes the node app with `Segmentation fault` message when large passwords are analyzed in `node 0.10.31`
