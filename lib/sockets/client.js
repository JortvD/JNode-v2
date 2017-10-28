/**
 * @module client
 */
module.exports = function(jnode, socket) {
	var self = {};

	/**
	 * @module  client/info
	 */
	self.info = function() {
		var self_ = {};

		/**
		 * @function id
		 */
		self_.id = function() {
			return socket.id;
		}

		/**
		 * @function address
		 */
		self_.address = function() {
			return socket.handshake.address;
		}

		/**
		 * @function headers
		 */
		self_.headers = function() {
			return socket.handshake.headers;
		}

		/**
		 * @function secure
		 */
		self_.secure = function() {
			return socket.handshake.secure;
		}

		/**
		 * @function xdomain
		 */
		self_.xdomain = function() {
			return socket.handshake.xdomain;
		}

		/**
		 * @function url
		 */
		self_.url = function() {
			return socket.handshake.url;
		}

		return self_;
	}

	/**
	 * @function emit
	 */
	self.emit = function(event, ...args) {
		event = jnode.utils().check("string", event, "event");

		socket.emit(event, ...args);
	}

	/**
	 * @function on
	 */
	self.on = function(event) {
		event = jnode.utils().check("string", event, "event");

		return jnode.promise(function(event_) {
			socket.on(event, function(packet, next) {
				event_(event, ...args);
			});
		});
	}

	/**
	 * @function use
	 */
	self.use = function() {
		return jnode.promise(function(event) {
			socket.use(function(packet, next) {
				event_("packet", packet, next);
			});
		});
	}

	/**
	 * @function disconnect
	 */
	self.disconnect = function() {
		socket.disconnect(true);
	}

	return self;
}