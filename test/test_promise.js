var expect = require("chai").expect;
var jnode = require("../index")();

describe("promise", function() {
	describe("constructor", function() {
		context("with no parameters", function() {
			it("should throw an error", function() {
				expect(jnode.promise).to.throw();
			});
		});

		context("with a function as parameter", function() {
			it("should throw no errors", function() {
				var promise = jnode.promise(function(event) {});
			});

			it("should not be null", function() {
				var promise = jnode.promise(function(event) {});
				expect(promise).to.not.be.null;
			});

			it("should not be undefined", function() {
				var promise = jnode.promise(function(event) {});
				expect(promise).to.not.be.undefined;
			});
		});
	});

	describe("#then()", function() {
		beforeEach(function() {
			this.promise = jnode.promise(function(event) {});
		});

		context("with no parameters", function() {
			it("should throw an error", function() {
				expect(this.promise.then).to.throw();
			});
		});

		context("with a function as parameter", function() {
			it("should throw no errors", function() {
				this.promise.then(function() {});
			});
		});

		context("with a non-function as parameter", function() {
			it("should throw an error", function() {
				var func = function() {
					this.promise.then(0);
				}

				expect(func).to.throw();
			});
		});
	});

	describe("#catch()", function() {
		beforeEach(function() {
			this.promise = jnode.promise(function(event) {});
		});

		context("with no parameters", function() {
			it("should throw an error", function() {
				expect(this.promise.catch).to.throw();
			});
		});

		context("with a function as parameter", function() {
			it("should throw no errors", function() {
				this.promise.catch(function() {});
			});
		});

		context("with a non-function as parameter", function() {
			it("should throw an error", function() {
				var func = function() {
					this.promise.catch(0);
				}

				expect(func).to.throw();
			});
		});
	});

	describe("#stack()", function() {
		context("with no parameters", function() {
			it("should throw an error", function() {
				var func = function() {
					jnode.promise(function(event) {}).stack();
				}

				expect(func).to.throw();
			});
		});

		context("with a promise event as parameter", function() {
			it("should throw no errors", function() {
				jnode.promise(function(event) {
					jnode.promise(function() {}).stack(event);
				});
			});
		});

		context("with a non-promise event as parameter", function() {
			it("should throw an error", function() {
				var func = function() {
					jnode.promise(function(event) {}).stack(0);
				}

				expect(func).to.throw();
			});
		});
	});

	describe("events", function() {
		context("with no parameters", function() {
			it("should throw no errors", function() {
				jnode.promise(function(event) {
					event();
				});
			});
		});

		describe("then", function() {
			context("with no arguments", function() {
				it("should throw no errors", function(done) {
					jnode.promise(function(event) {
						event("then");
					})
					.then(function() {
						done();
					});
				});
			});

			context("with a single argument", function() {
				it("should be the same", function(done) {
					jnode.promise(function(event) {
						event("then", 1);
					})
					.then(function(arg) {
						expect(arg).to.equal(1);
						done();
					});
				});
			});

			context("with multiple arguments", function() {
				it("should be the same", function(done) {
					jnode.promise(function(event) {
						event("then", 1, 2, 3);
					})
					.then(function(arg1, arg2, arg3) {
						expect(arg1).to.equal(1);
						expect(arg2).to.equal(2);
						expect(arg3).to.equal(3);
						done();
					});
				});
			});

			context("with event first and multiple arguments", function() {
				it("should start with the event and be the same", function() {
					jnode.promise(function(event) {
						event("then", 1, 2, 3);
					})
					.then(function(event, arg1, arg2, arg3) {
						expect(event).to.equal("then");
						expect(arg1).to.equal(1);
						expect(arg2).to.equal(2);
						expect(arg3).to.equal(3);
						done();
					}, true);
				});
			});
		});

		describe("catch", function() {
			context("with no arguments", function() {
				it("should throw no errors", function(done) {
					jnode.promise(function(event) {
						event("error");
					})
					.catch(function() {
						done();
					});
				});
			});

			context("with a single argument", function() {
				it("should be the same", function(done) {
					jnode.promise(function(event) {
						event("error", 1);
					})
					.catch(function(arg) {
						expect(arg).to.equal(1);
						done();
					});
				});
			});

			context("with multiple arguments", function() {
				it("should be the same", function(done) {
					jnode.promise(function(event) {
						event("error", 1, 2, 3);
					})
					.catch(function(arg1, arg2, arg3) {
						expect(arg1).to.equal(1);
						expect(arg2).to.equal(2);
						expect(arg3).to.equal(3);
						done();
					});
				});
			});
		});

		describe("stack", function() {
			context("with no arguments", function() {
				it("should throw no errors", function(done) {
					jnode.promise(function(event) {
						jnode.promise(function(event) {
							event("then");
						})
						.stack(event);
					})
					.then(function() {
						done();
					});
				});
			});

			context("with a single argument", function() {
				it("should be the same", function(done) {
					jnode.promise(function(event) {
						jnode.promise(function(event) {
							event("then", 1);
						})
						.stack(event);
					})
					.then(function(arg) {
						expect(arg).to.equal(1);
						done();
					});
				});
			});

			context("with multiple arguments", function() {
				it("should be the same", function(done) {
					jnode.promise(function(event) {
						jnode.promise(function(event) {
							event("then", 1, 2, 3);
						})
						.stack(event);
					})
					.then(function(arg1, arg2, arg3) {
						expect(arg1).to.equal(1);
						expect(arg2).to.equal(2);
						expect(arg3).to.equal(3);
						done();
					});
				});
			});
		});
	});
});