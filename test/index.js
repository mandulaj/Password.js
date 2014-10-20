var Password = require('../index.js');
var expect = require("expect.js")

describe('Password', function(){
  describe('#constructor()', function(){
    it('should return and object', function(){
      var psswd = new Password("password123");
      expect(psswd.password).to.equal("password123");
      expect(psswd).to.be.a(Password);
      expect(psswd).to.have.keys("password", "opts");
      expect(psswd.opts).to.be.an("object");
      expect(psswd.cb).to.be(null);
    });
    it("should set the callback correctly", function(){
      var ps1 = new Password("asdf",{},function(){});
      expect(ps1.cb).to.be.a("function");
      var ps2 = new Password("asdf", function(){});
      expect(ps2.cb).to.be.a("function");
    });
    it("should set the defaults", function(){
      var ps = new Password("asd");
      expect(ps.opts).to.only.have.keys(["commonWords", "minWordDistance", "complexity"]);
      expect(ps.opts.commonWords).to.contain("password");
      expect(ps.opts.commonWords).to.contain("123456");
      expect(ps.opts.commonWords).to.contain("secret");
      
      expect(ps.opts.minWordDistance).to.be(3);
      expect(ps.opts.complexity).to.be(5);
    });
    it("should merge new options correctly", function(){
      var ps = new Password("asd", {
        complexity: 10,
        commonWords: ["hello", "swag", "password"]
      });
      expect(ps.opts).to.only.have.keys(["commonWords", "minWordDistance", "complexity"]);
      expect(ps.opts.commonWords).to.contain("password");
      expect(ps.opts.commonWords).to.contain("swag");
      expect(ps.opts.commonWords).to.contain("hello");
      
      expect(ps.opts.minWordDistance).to.be(3);
      expect(ps.opts.complexity).to.be(10);
 
    });
  });
  describe('#update()', function(){
    it("should update the password string in the object", function(){
        var passwd = new Password("password");
        expect(passwd.password).to.equal("password");
        passwd.update("aNewPassword");
        expect(passwd.password).to.equal("aNewPassword");
    });
    it("should not change the options", function(){
       var passwd = new Password("password");
       var opts = passwd.opts;
       passwd.update("testtesttest");
       expect(passwd.opts).to.eql(opts);
    });
    it("should set default options",function(){
        var ps = new Password("piou");
        expect(ps.opts.commonWords).to.contain("password");
        expect(ps.opts.commonWords).to.contain("123456");
        expect(ps.opts.commonWords).to.contain("secret");
    });
    it("should trigger the update callback", function(){
        var testFlag = 0;
        var ps = new Password("asdf", { }, function(){
            testFlag += 1;
        });
        expect(testFlag).to.be(1);
        ps.update("newPass")
        expect(testFlag).to.be(2)
    });
    it("should merge new options into old", function(){
       
    });
  });
});
