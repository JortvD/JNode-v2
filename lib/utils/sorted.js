/**
 * @module sorted
 */
module.exports = function() {
	var self = {};

	var arr = {};

	/**
	 * @function insert
	 */
	self.insert = function(key, value) {
		key = jnode.utils().check("string", key, "key");

		var output = {};

		arr[key] = value;

	    Object.keys(arr).sort().forEach(function(key_) {
	        output[key_] = arr[key_];
	    });

	    arr = output;
	}

	/**
	 * @function delete
	 */
	self.delete = function(key) {
		key = jnode.utils().check("string", key, "key");

		delete arr[key];
	}

	/**
	 * @function clear
	 */
	self.clear = function() {
		arr = {};
	}

	/**
	 * @function get
	 */
	self.get = function() {
		return arr;
	}

	/**
	 * @function set
	 */
	self.set = function(arr_) {
		arr = arr_;
	}

	return self;
}