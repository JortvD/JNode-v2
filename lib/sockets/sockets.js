/**
 * @module sockets
 */
module.exports = function(jnode) {
	var self = {};

	var server = require('http').createServer();
	var io = require('socket.io')(server, {
	  path: '/',
	  serveClient: false,
	});
	var room = require("./room");
	var room_ = new room(jnode, io);

	/**
	 * @function name
	 */
	self.name = room_.name;

	/**
	 * @function broadcast
	 */
	self.broadcast = room_.broadcast;

	/**
	 * @function connections
	 */
	self.connections = room_.connections;

	/**
	 * @function use
	 */
	self.use = room_.use;

	/**
	 * @function listen
	 */
	self.listen = room_.listen;

	/**
	 * @function room
	 */
	self.room = function() {
		return new room(socket.of(name));
	}

	/**
	 * @function start
	 */
	self.start = function() {
		return jnode.promise(function(event) {
			server.listen(3000, function() {
				event("success");
			});
		});
	}

	/**
	 * @function stop
	 */
	self.stop = function() {
		return jnode.promise(function(event) {
			server.close(function() {
				event("success");
			});
		});
	}

	/**
	 * @module sockets/origins
	 */
	self.origins = function() {
		var self_ = {};

		var origins = [];

		io.origins(function(origin, callback) {
			for(var i = 0; i < origins.length; i++) {
				if(origin == origins[i]) {
					return callback(null, true);
				}
			}

			callback('origin not allowed', false);
		});

		/**
		 * @function add
		 */
		self_.add = function(origin) {
			origin = jnode.utils().check("string", origin, "origin");

			origins[origins.length] = origin;
		}

		/**
		 * @function list
		 */
		self_.list = function() {
			return origins;
		}

		/**
		 * @function remove
		 */
		self_.remove = function(origin) {
			origin = jnode.utils().check("string", origin, "origin");
			
			for(var i = 0; i < origins.length; i++) {
				if(origins[i] == origin) {
					origins = origins.splice(i);
				}
			}
		}

		/**
		 * @function clear
		 */
		self_.clear = function() {
			origins = [];
		}
	}

	return self;
}