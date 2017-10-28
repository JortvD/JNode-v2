/**
 * @module locales
 */
module.exports = function(jnode) {
	var self = {};

	var languages = {};
	var default_ = null;

	var append = function(obj, path) {
		var locals = {};

		path = path || "";

		for(var key in obj) {
			if(typeof obj[key] == "object") {
				locals = Object.assign(locals, append(obj[key], path == "" ? key : path + "." + key));
			}
			else {
				locals[path == "" ? key : path + "." + key] = obj[key];
			}
		}

		return locals;
	}

	/**
	 * @module locales/languages
	 */
	self.languages = function() {
		var self_ = {};

		/**
		 * @function add
		 */
		self_.add = function(code, file) {
			code = jnode.utils().check("string", code, "code");
			file = jnode.utils().check("string", file, "file");

			languages[code] = append(require(
				jnode.settings().root() + 
				jnode.settings().directories().locales() + 
				file));
		}

		/**
		 * @function remove
		 */
		self_.remove = function(code) {
			code = jnode.utils().check("string", code, "code");
			languages[code] = null;
		}

		/**
		 * @function clear
		 */
		self_.clear = function() {
			languages = {};
		}

		return self_;
	}

	/**
	 * @function locale
	 */
	self.locale = function(code, path) {
		if(code != null && path == null) {
			if(default_ != null && languages[default_] != null) {
				return languages[default_][path];
			}

			return;
		}
		else if(languages[code] == null) {
			return;
		}

		return languages[code][path];
	}

	/**
	 * @function default
	 */
	self.default = function(default__) {
		if(default__ != null) {
			default_ = default__;
		}

		return default_;
	}

	return self;
}