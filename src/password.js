//Password.js

/* Object used to analyze the strength of a password
 *
 * @param {String} password - the password we would like to analyze
 * @param {Object} opts     - any default options we would like to override
 *    {Array} commonWords       - array of common words that should be checked
 *    {Integer} minWordDistance - the minimum distance between password and any word from `commonWords` that is acceptable
 *    {Integer} complexity      - the complexity of the password required {1->simple, 10->overkill}
 * @param {Function} cb     - a callback we would like to run each time we update the password
 */
function Password(password, opts, cb) {
  this.defaultOpts = {
    commonWords: ["password", "123456", "secret"],
    minWordDistance: 3,
    complexity: 5
  };
  if (typeof opts == "function") {
    cb = opts;
    opts = {};
  }
  opts = opts || {};
  this.opts = this._mergeOpts(opts, this.defaultOpts);
  this.cb = cb || null;

  this.password = password;

  if (this.cb !== null) {
    this.cb(this.profile());
  }
}

Password.prototype = {
  /* update the password and options (the old options are taken as default)
   *
   * @param {String} password - new password that we want to analyze
   * @param {Object} opts     - any change of options (options documented at with constructor)
   */
  update: function(password, opts) {
    this.password = password;
    opts = opts || {};
    this.opts = this._mergeOpts(opts, this.opts);

    // if we are listening for changes, fire the callback
    if (this.cb !== null) {
      this.cb(this.profile());
    }
  },

  /* returns a profile of the password
   *
   * @return {Object} - profile of the password (documented in /doc)
   */
  profile: function() {
    return this.password;
  },

  /* checks if the password matches any word in the list of common words
   *
   * @return {Bool} - returns true if the word is not in the common words list
   */
  getWordStrength: function() {
    var word = "";
    var dist = 0;
    var i = 0;
    for (i in this.opts.commonWords) {
      word = this.opts.commonWords[i];
      if (this._vagueMatch(this.password, word)) {
        return false;
      }
    }
    return true;
  },

  getCharSet: function() {
    var charset = 0;
    var passwd = this.password;
    if (passwd.match(/[a-z]/)) {
      charset += 26;
    }
    if (passwd.match(/[A-Z]/)) {
      charset += 26;
    }
    if (passwd.match(/[0-9]/)) {
      charset += 10;
    }
    if (passwd.match(/[@!#$%^&*()]/)) {
      charset += 10;
    }
    if (passwd.match(/['"`~\-=+\[\]{}\\|;:,<.>/?]/)) {
      charset += 20;
    }
    if (passwd.match(/\s/)) {
      charset += 1;
    }

    var charCodeIndex = {
      "191": true,
      "687": true,
      "879": true,
    };
    for (var i = 0, n = passwd.length; i < n; i++) {
      var charCode = passwd.charCodeAt(i);
      if (charCode <= 126) {
        continue;
      }
      // Characters 160 - 191
      if (charCodeIndex["191"] && charCode <= 191) {
        charset += 32;
        charCodeIndex["191"] = false;
        continue;
      }

      // Characters 192 - 687 LATIN
      if (charCodeIndex["687"] && charCode <= 687) {
        charset += 495;
        charCodeIndex["697"] = false;
        continue;
      }

      //CHaracters 689 - 879 MOD
      if (charCodeIndex["879"] && charCode <= 879) {
        charset += 292;
        charCodeIndex["879"] = false;
        continue;
      }
    }
    return charset;
  },

  /* calculates the entropy of the password
   *
   * @return {Float} number of entropy bits the password consists of
   */
  getEntropy: function() {
    var password = this.password;
    var charSize = this.getCharSet();
    var passwdlen = password.length;
    return passwdlen * (Math.log(charSize) / Math.log(2));
  },

  /* remove the variable password from memory
   */
  clean: function() {
    this.password = "";
  },

  /* a function used to merge the default options with those provided by th user
   *
   * @param {Object} opts - the new options we want to apply
   * @param {Object} defaults - the old options we want to update
   * @return {Object} the new merged options
   */
  _mergeOpts: function(opts, defaults) {
    for (var key in defaults) {
      if (typeof opts[key] == typeof defaults[key]) {
        defaults[key] = opts[key];
      }
    }
    return defaults;
  },

  /* vaguely matches a substring in strings (ignoring case)
   *
   * @param {String} str - the string we will try to match onto
   * @param {String} pattern - the pattern string we are trying to find in `str`
   * @return {Bool} returns true if the word distance between the two words is less then or equal to `opts.minWordDistance`
   */
  _vagueMatch: function(str, pattern) {
    str = str.toLowerCase();
    var lengthDistance = str.length - pattern.length;
    if (lengthDistance <= 0) {
      return this._levenshteinDist(str, pattern);
    }

    var dist = 0;
    var substr = "";
    for (var i = 0; i + pattern.length <= str.length; i++) {
      substr = str.substr(i, pattern.length);
      dist = this._levenshteinDist(substr, pattern);
      if (dist <= this.opts.minWordDistance) {
        return true;
      }
    }
    return false;
  },

  /* Levenshtein Distance function (many thanks to James Westgate http://stackoverflow.com/a/11958496)
   *
   * @param {String} s - string 1
   * @param {String} t - string 2
   * @return {Integer} the Levenshtein distance between string 1 and string 2
   */

  _levenshteinDist: function(s, t) {
    var i, j;
    var d = []; //2d matrix
    // Step 1
    var n = s.length;
    var m = t.length;

    if (n === 0) return m;
    if (m === 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (i = n; i >= 0; i--) d[i] = [];
    // Step 2
    for (i = n; i >= 0; i--) d[i][0] = i;
    for (j = m; j >= 0; j--) d[0][j] = j;
    // Step 3
    for (i = 1; i <= n; i++) {
      var s_i = s.charAt(i - 1);

      // Step 4
      for (j = 1; j <= m; j++) {

        //Check the jagged ld total so far
        if (i == j && d[i][j] > 4) return n;

        var t_j = t.charAt(j - 1);
        var cost = (s_i == t_j) ? 0 : 1; // Step 5

        //Calculate the minimum
        var mi = d[i - 1][j] + 1;
        var b = d[i][j - 1] + 1;
        var c = d[i - 1][j - 1] + cost;

        if (b < mi) mi = b;
        if (c < mi) mi = c;

        d[i][j] = mi; // Step 6
        //Damerau transposition
        if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
        }
      }
    }
    // Step 7
    return d[n][m];
  }
};


// are we in browser or in node
if (module) {
  module.exports = Password;
} else {
  window.Password = Password;
}
