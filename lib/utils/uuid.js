/**
 * @module uuid
 */
module.exports = function() {
	var self = {};

	var crypto = require("crypto");

	var generate_uuid = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	var uuids = [];

	/**
	 * @function uuids
	 */
	self.uuids = function() {
		return uuids;
	}

	/**
	 * @function generate
	 */
	self.generate = function() {
		return uuids[uuids.length] = generate_uuid();
	}

	/**
	 * @function add
	 */
	self.add = function(uuid) {
		uuid = jnode.utils().check("string", uuid, "uuid");

		uuids[uuids.length] = uuid;
	}

	/**
	 * @function remove
	 */
	self.remove = function(uuid) {
		uuid = jnode.utils().check("string", uuid, "uuid");

		for(var i = 0; i < uuids.length; i++) {
			if(uuids[i] == uuid) {
				uuids.splice(i, 1);
			}
		}
	}

	/**
	 * @function clear
	 */
	self.clear = function() {
		uuids = [];
	}

	/**
	 * @function check
	 */
	self.check = function(uuid) {
		uuid = jnode.utils().check("string", uuid, "uuid");

		for(var i = 0; i < uuids.length; i++) {
			if(uuids[i] == uuid) {
				return true;
			}
		}

		return false;
	}

	/**
	 * @function test
	 */
	self.test = function(uuid) {
		if(typeof uuid == 'string') {
			return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid);
		}
	}

	return self;
}