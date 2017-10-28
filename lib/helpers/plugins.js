/**
 * @module plugins
 */
module.exports = function(jnode) {
	var self = {};

	var plugins = {};

	/**
	 * @function add
	 */
	self.add = function(plugin) {
		plugin = jnode.utils().check("string", plugin, "plugin");

		var name = jnode.utils().check("string", plugin["name"], "plugin.name");
		var version = plugin["version"];
		var init = null;

		if(typeof version != "string") {
			version = null;
		}

		for(var key in plugin) {
			if(key == "init" && typeof plugin[key] == "function") {
				return init = plugin[key](jnode);
			}
			else if(jnode[key] == null && typeof plugin[key] == "function") {
				jnode[key] = plugin[key];
			}
			else {
				delete plugin[key];
			}
		}

		plugins[name] = {
			"funcs": plugin,
			"name": name,
			"version": version,
			"init": init
		}
	}

	/**
	 * @function remove
	 */
	self.remove = function(name) {
		name = jnode.utils().check("string", name, "name");
		var plugin = plugins[name];

		for(var key in plugins[name]) {
			jnode[key] = null;
		}

		delete plugins[name];
	}

	/**
	 * @function check
	 */
	self.check = function(name) {
		name = jnode.utils().check("string", name, "name");

		return plugins[name] != null; 
	}

	/**
	 * @function list
	 */
	self.list = function() {
		return Object.keys(plugins);
	}

	return self;
}