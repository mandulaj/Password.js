var Password = require('../index.js');
var expect = require("expect.js")

describe('Password', function(){
  describe('#constructor', function(){
    it('should return and object', function(){
      var passwd = new Password("password123")
      expect(passwd.password).to.equal("password123");
    })
  })
})
