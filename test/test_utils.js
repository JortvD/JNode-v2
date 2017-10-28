var expect = require("chai").expect;
var utils = require("../index")().utils();

describe("utils", function() {
	describe("#type()", function() {
		context("with no parameters", function() {
			it("should return the string 'undefined'", function() {
				var val = utils.type();
				expect(val).to.equal("undefined");
			});
		});

		context("with null as parameter", function() {
			it("should return the string 'object'", function() {
				var val = utils.type(null);
				expect(val).to.equal("object");
			});
		});

		context("with an object as parameter", function() {
			it("should return the string 'object'", function() {
				var val = utils.type({});
				expect(val).to.equal("object");
			});
		});

		context("with a string as parameter", function() {
			it("should return the string 'string'", function() {
				var val = utils.type("abcd1234");
				expect(val).to.equal("string");
			});
		});

		context("with a number as parameter", function() {
			it("should return the string 'number'", function() {
				var val = utils.type(1);
				expect(val).to.equal("number");
			});
		});

		context("with an array as parameter", function() {
			it("should return the string 'object'", function() {
				var val = utils.type([]);
				expect(val).to.equal("object");
			});
		});
	});

	describe("#clone()", function() {
		context("with no parameters", function() {
			it("should return 'undefined'", function() {
				var val = utils.clone();
				expect(val).to.be.undefined;
			});
		});

		context("with null as parameter", function() {
			it("should return 'null'", function() {
				var val = utils.clone(null);
				expect(val).to.be.null;
			});
		});

		context("with an object as parameter", function() {
			it("should return '{a: {b: c}}'", function() {
				var val = utils.clone({"a": {"b": "c"}});
				expect(val).to.deep.equal({"a": {"b": "c"}});
			});
		});

		context("with a string as parameter", function() {
			it("should return 'abcd1234'", function() {
				var val = utils.clone("abcd1234");
				expect(val).to.equal("abcd1234");
			});
		});

		context("with a number as parameter", function() {
			it("should return '1234'", function() {
				var val = utils.clone(1234);
				expect(val).to.equal(1234);
			});
		});

		context("with an array as parameter", function() {
			it("should return '[1,2,3,4]'", function() {
				var val = utils.clone([1,2,3,4]);
				expect(val).to.deep.equal([1,2,3,4]);
			});
		});
	});

	describe("#keys()", function() {
		context("with no parameters", function() {
			it("should return undefined", function() {
				var val = utils.keys();
				expect(val).to.be.undefined;
			});
		});

		context("with null as parameter", function() {
			it("should return null", function() {
				var val = utils.keys(null);
				expect(val).to.be.null;
			});
		});

		context("with an object as parameter", function() {
			it("should return the array '['a', 'b', 'c']'", function() {
				var val = utils.keys({"a": "d", "b": "e", "c": "f"});
				expect(val).to.deep.equal(["a", "b", "c"]);
			});
		});
	});

	describe("#values()", function() {
		context("with no parameters", function() {
			it("should return undefined", function() {
				var val = utils.values();
				expect(val).to.be.undefined;
			});
		});

		context("with null as parameter", function() {
			it("should return null", function() {
				var val = utils.values(null);
				expect(val).to.be.null;
			});
		});

		context("with an object as parameter", function() {
			it("should return the array '['d', 'e', 'f']'", function() {
				var val = utils.values({"a": "d", "b": "e", "c": "f"});
				expect(val).to.deep.equal(["d", "e", "f"]);
			});
		});
	});

	describe("#size()", function() {
		context("with no parameters", function() {
			it("should return undefined", function() {
				var val = utils.size();
				expect(val).to.be.undefined;
			});
		});

		context("with null as parameter", function() {
			it("should return 0", function() {
				var val = utils.size(null);
				expect(val).to.equal(0);
			});
		});

		context("with a string as parameter", function() {
			it("should return 4", function() {
				var val = utils.size("abcd");
				expect(val).to.equal(4);
			});
		});

		context("with a number as parameter", function() {
			it("should return 1", function() {
				var val = utils.size(1);
				expect(val).to.equal(1);
			});
		});

		context("with an object as parameter", function() {
			it("should return 3", function() {
				var val = utils.size({"a": "d", "b": "e", "c": "f"});
				expect(val).to.equal(3);
			});
		});

		context("with an array as parameter", function() {
			it("should return 3", function() {
				var val = utils.size(["a", "b", "c"]);
				expect(val).to.equal(3);
			});
		});
	});

	describe("#concat()", function() {
		context("with no parameters", function() {
			it("should return undefined", function() {
				var val = utils.concat();
				expect(val).to.be.undefined;
			});
		});

		context("with an array as parameter", function() {
			it("should return the same array", function() {
				var val = utils.concat(["a", "b", "c"]);
				expect(val).to.deep.equal(["a", "b", "c"]);
			});
		});

		context("with an array and a string as parameters", function() {
			it("should return a single array", function() {
				var val = utils.concat(["a", "b", "c"], "d");
				expect(val).to.deep.equal(["a", "b", "c", "d"]);
			});
		});

		context("with an array and multiple strings as parameters", function() {
			it("should return a single array", function() {
				var val = utils.concat(["a", "b", "c"], "d", "e");
				expect(val).to.deep.equal(["a", "b", "c", "d", "e"]);
			});
		});

		context("with two arrays as parameters", function() {
			it("should return a single array", function() {
				var val = utils.concat(["a", "b", "c"], ["d", "e", "f"]);
				expect(val).to.deep.equal(["a", "b", "c", "d", "e", "f"]);
			});
		});

		context("with three arrays as parameters", function() {
			it("should return a single array", function() {
				var val = utils.concat(["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]);
				expect(val).to.deep.equal(["a", "b", "c", "d", "e", "f", "g", "h", "i"]);
			});
		});

		context("with arrays and strings as parameters", function() {
			it("should return a single array", function() {
				var val = utils.concat(["a", "b", "c"], "d", ["e", "f", "g"], "h");
				expect(val).to.deep.equal(["a", "b", "c", "d", "e", "f", "g", "h"]);
			});
		});
	});

	describe("#check()", function() {
		context("with no parameters", function() {
			it("should return undefined", function() {
				var val = utils.check();
				expect(val).to.be.undefined;
			});
		});

		context("with the correct parameters", function() {
			it("should throw no errors", function() {
				var val = function() {
					utils.check("string", "abcd1234", "test");
				}
				expect(val).to.not.throw();
			});
		});

		context("with the incorrect parameters", function() {
			it("should throw an error", function() {
				var val = function() {
					utils.check("string", 1, "test");
				}
				expect(val).to.throw();
			});
		});
	});

	describe("#insert()", function() {
		context("with no parameters", function() {
			it("should return undefined", function() {
				var val = utils.insert();
				expect(val).to.be.undefined;
			});
		});

		context("with a string at the end as parameter", function() {
			it("should return a single array", function() {
				var val = utils.insert(["a", "b", "c"], "d");
				expect(val).to.deep.equal(["a", "b", "c", "d"]);
			});
		});

		context("with a string at the start as parameter", function() {
			it("should return a single array", function() {
				var val = utils.insert(["b", "c", "d"], "a", 0);
				expect(val).to.deep.equal(["a", "b", "c", "d"]);
			});
		});

		context("with an array at the end as parameter", function() {
			it("should return a single array", function() {
				var val = utils.insert(["a", "b", "c"], ["d", "e"]);
				expect(val).to.deep.equal(["a", "b", "c", "d", "e"]);
			});
		});

		context("with an array at the start as parameter", function() {
			it("should return a single array", function() {
				var val = utils.insert(["c", "d", "e"], ["a", "b"], 0);
				expect(val).to.deep.equal(["a", "b", "c", "d", "e"]);
			});
		});
	});

	describe("#arrayify()", function() {
		context("with no parameters", function() {
			it("should return undefined", function() {
				var val = utils.arrayify();
				expect(val).to.be.undefined;
			});
		});

		context("with a string as parameter", function() {
			it("should return a single array", function() {
				var val = utils.arrayify("a");
				expect(val).to.deep.equal(["a"]);
			});
		});

		context("with multiple strings as parameter", function() {
			it("should return a single array", function() {
				var val = utils.arrayify("a", "b");
				expect(val).to.deep.equal(["a", "b"]);
			});
		});

		context("with an array as parameter", function() {
			it("should return a single array", function() {
				var val = utils.arrayify(["a", "b"]);
				expect(val).to.deep.equal(["a", "b"]);
			});
		});

		context("with multiple arrays as parameter", function() {
			it("should return a single array", function() {
				var val = utils.arrayify(["a", "b"], ["c", "d"]);
				expect(val).to.deep.equal(["a", "b", "c", "d"]);
			});
		});

		context("with multiple arrays and strings as parameter", function() {
			it("should return a single array", function() {
				var val = utils.arrayify(["a"], "b", ["c"], "d");
				expect(val).to.deep.equal(["a", "b", "c", "d"]);
			});
		});
	});

	describe("#chunk()", function() {
		context("with no parameters", function() {
			it("should return undefined", function() {
				var val = utils.chunk();
				expect(val).to.be.undefined;
			});
		});

		context("with no size as parameter", function() {
			it("should return undefined", function() {
				var val = utils.chunk(["a", "b", "c", "d", "e", "f"]);
				expect(val).to.be.undefined;
			});
		});

		context("with a size of one as parameters", function() {
			it("should return an array of arrays", function() {
				var val = utils.chunk(["a", "b", "c", "d", "e", "f"], 1);
				expect(val).to.deep.equal([["a"], ["b"], ["c"], ["d"], ["e"], ["f"]]);
			});
		});

		context("with a size of two as parameters", function() {
			it("should return an array of arrays", function() {
				var val = utils.chunk(["a", "b", "c", "d", "e", "f"], 2);
				expect(val).to.deep.equal([["a", "b"], ["c", "d"], ["e", "f"]]);
			});
		});

		context("with a size of three as parameters", function() {
			it("should return an array of arrays", function() {
				var val = utils.chunk(["a", "b", "c", "d", "e", "f"], 3);
				expect(val).to.deep.equal([["a", "b", "c"], ["d", "e", "f"]]);
			});
		});

		context("with a size of four as parameters", function() {
			it("should return an array of arrays", function() {
				var val = utils.chunk(["a", "b", "c", "d", "e", "f"], 4);
				expect(val).to.deep.equal([["a", "b", "c", "d"], ["e", "f"]]);
			});
		});

		context("with a size of five as parameters", function() {
			it("should return an array of arrays", function() {
				var val = utils.chunk(["a", "b", "c", "d", "e", "f"], 5);
				expect(val).to.deep.equal([["a", "b", "c", "d", "e"], ["f"]]);
			});
		});

		context("with a size of siz as parameters", function() {
			it("should return an array of arrays", function() {
				var val = utils.chunk(["a", "b", "c", "d", "e", "f"], 6);
				expect(val).to.deep.equal([["a", "b", "c", "d", "e", "f"]]);
			});
		});
	});

	describe("#delay()", function() {
		context("with no parameters", function() {
			it("should return undefined", function() {
				var val = utils.delay();
				expect(val).to.be.undefined;
			});
		});

		context("with a delay of 0 ms", function() {
			it("should throw no errors", function(done) {
				utils.delay(0)
				.then(function() {
					done();
				});
			});
		});

		context("with a delay of 1 ms", function() {
			it("should throw no errors", function(done) {
				utils.delay(1)
				.then(function() {
					done();
				});
			});
		});

		context("with a delay of 4 ms", function() {
			it("should throw no errors", function(done) {
				utils.delay(4)
				.then(function() {
					done();
				});
			});
		});

		context("with a delay and arguments", function() {
			it("should throw no errors", function(done) {
				utils.delay(4, "a", "b", "c")
				.then(function(arg1, arg2, arg3) {
					expect(arg1).to.equal("a");
					expect(arg2).to.equal("b");
					expect(arg3).to.equal("c");
					done();
				});
			});
		});
	});
});