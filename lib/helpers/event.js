/**
 * @module event
 */
module.exports = function(jnode) {
	var self = {};

	var listeners = {};
	var blocked_listeners = [];

	/**
	 * @function emit
	 */
	self.emit = function(event, ...data) {
		event = jnode.utils().check("string", event, "event");

		if(blocked_listeners.includes(event)) {
			return;
		}

		for(var i = 0; i < listeners[event].length; i++) {
			listeners[event][i]("event", ...data);
		}
	}

	/**
	 * @function on
	 */
	self.on = function(event) {
		event = jnode.utils().check("string", event, "event");

		if(listeners[event] == null) {
			listeners[event] = [];
		}
		return jnode.promise(function(event_) {
			listeners[event][listeners[event].length] = event_;
		});
	}

	/**
	 * @function clear
	 */
	self.clear = function(event) {
		event = jnode.utils().check("string", event, "event");

		listeners[event] = null;
	}

	/**
	 * @function block
	 */
	self.block = function(event) {
		event = jnode.utils().check("string", event, "event");

		blocked_listeners[blocked_listeners.length] = event;
	}

	/**
	 * @function unblock
	 */
	self.unblock = function(event) {
		event = jnode.utils().check("string", event, "event");

		for(var i = 0; i < blocked_listeners.length; i++) {
			if(blocked_listeners[i] == event) {
				blocked_listeners.splice(i);
				return;
			}
		}
	}
	
	return self;
}