/**
 * @module validator
 */
module.exports = function(jnode) {
	var self = {};

	var validators = {};

	/**
	 * @function add
	 */
	self.add = function(name, func) {
		name = jnode.utils().check("string", name, "name");
		func = jnode.utils().check("function", func, "func");

		validators[name] = func;
	}

	/**
	 * @function remove
	 */
	self.remove = function(name) {
		name = jnode.utils().check("string", name, "name");

		for(var key in validators) {
			if(key == name) {
				validators[key] = null;
			}
		}
	}

	/**
	 * @function validate
	 */
	self.validate = function(name, data, ...args) {
		if(validators[name] == null || data == null) {
			return;
		}

		return validators[name](data, ...args);
	}

	self.add("string", function(data, name, error) {
		if(!jnode.utils().is().string(data)) {
			error.message = "The parameter `" + name + "` must be a string!";
			jnode.logger().error(error);
			jnode.exit();
		}

		return true;
	});

	self.add("number", function(data, name) {
		if(!jnode.utils().is().number(data)) {
			error.message = "The parameter `" + name + "` must be a number!";
			jnode.logger().error(error);
			jnode.exit();
		}

		return true;
	});

	self.add("object", function(data, name) {
		if(!jnode.utils().is().object(data)) {
			error.message = "The parameter `" + name + "` must be an object!";
			jnode.logger().error(error);
			jnode.exit();
		}

		return true;
	});

	self.add("function", function(data, name) {
		if(!jnode.utils().is().function(data)) {
			error.message = "The parameter `" + name + "` must be a function!";
			jnode.logger().error(error);
			jnode.exit();
		}

		return true;
	});

	return self;
}