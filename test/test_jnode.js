var expect = require("chai").expect;
var jnode = require("../index")();

describe("server", function() {
	describe("#start()", function() {
		it("should start with no errors", function(done) {
			jnode.start()
			.then(function() {
				done();
			})
			.catch(function() {
				done("error");
			});
		});
	});

	describe("#stop()", function() {
		it("should stop with no errors", function(done) {
			jnode.stop()
			.then(function() {
				done();
			})
			.catch(function() {
				done("error");
			});
		});
	});
});