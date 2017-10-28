/**
 * @module room
 */
module.exports = function(jnode, namespace) {
	var self = {};

	var client = require("./client");

	/**
	 * @function name
	 */
	self.name = function() {
		return namespace.name;
	}

	/**
	 * @function connections
	 */
	self.connections = function() {
		return namespace.connected;
	}

	/**
	 * @function broadcast
	 */
	self.broadcast = function(event, ...args) {
		event = jnode.utils().check("string", event, "event");

		namespace.emit(event, ...args);
	}

	/**
	 * @function listen
	 */
	self.listen = function() {
		return jnode.promise(function(event) {
			namespace.on("connection", function(socket) {
				event("connection", new client(socket));
			})
		});
	}

	/**
	 * @function use
	 */
	self.use = function() {
		return jnode.promise(function(event) {
			namespace.use(function(socket) {
				event("connection", socket);
			});
		});
	}

	return self;
}