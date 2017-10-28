module.exports = function(jnode) {
	var self = {};

	var http = require("http");
	var promise = require("./utils/promise");
	var server = http.createServer(function(req, res) {
		if(self.func != null) {
			self.func(req, res);
		}
	});

	self.func = function() {};

	self.start = function() {
		return jnode.promise(function(event) {
			server.listen(jnode.settings().port(), function() {
				event("started");
			});
		});
	}

	self.stop = function() {
		return jnode.promise(function(event) {
			server.close(function() {
				event("stopped");
			});
		});
	}

	self.listening = function() {
		return server.listening;
	}
	
	return self;
}