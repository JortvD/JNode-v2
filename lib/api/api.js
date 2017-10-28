/**
 * @module api
 */
module.exports = function(jnode) {
	var self = {};

	var json = require("./json");
	var policies = {};

	/**
	 * @function load
	 */
	self.load = function(name, type) {
		name = jnode.utils().check("string", name, "name");
		type = type || "api";

		switch(type) {
			case "policy":
				return require(jnode.settings().root() + 
					jnode.settings().directories().policies() + "/" + 
					name);
			case "api":
			default:
				return require(jnode.settings().root() + 
					jnode.settings().directories().api() + "/" + 
					name);
		}
	}

	/**
	 * @function remove
	 */
	self.remove = function(url) {
		url = jnode.utils().check("string", url, "url");

		jnode.router().remove(jnode.settings().urls().api() + url);
	}

	/**
	 * @function add
	 */
	self.add = function(url, policies_) {
		return jnode.promise(function(event) {
			url = jnode.utils().check("string", url, "url");
			policies_ = policies_ || [];

			if(typeof policies_ == "string") {
				policies_ = [policies_];
			}

			jnode.router().route("/" + jnode.settings().urls().api() + "/" + url)
			.then(function(req, res) {
				var json_ = json(res, req);

				for(var i = 0; i < policies_.length; i++) {
					if(policies[policies_[i]] == null) {
						continue;
					}

					policies[policies_[i]]("policy", req, json_, jnode);

					if(json_.emitted()) {
						return;
					}
				}

				event("request", req, json_, jnode);
			});
		});
	}

	/**
	 * @module api/policies
	 */
	self.policy = function() {
		var self_ = {};

		/**
		 * @function add
		 */
		self_.add = function(name) {
			return jnode.promise(function(event) {
				name = jnode.utils().check("string", name, "name");

				policies[name] = event;
			});
		}

		/**
		 * @function remove
		 */
		self_.remove = function(name) {
			name = jnode.utils().check("string", name, "name");

			delete policies[name];
		}

		/**
		 * @function policies
		 */
		self_.policies = function() {
			return policies;
		}

		return self_;
	}

	return self;
}