/**
 * @module router
 */
module.exports = function(server, jnode) {
	var self = {};
	
	var response = require("./response");
	var request = require("./request");
	var sessions = require("./sessions")(jnode);

	var routes = [];
	var middlewares = [];

	var cancel = function(obj) {
		if(jnode.utils().is().error(obj)) {
			throw obj;
		}
	}

	server.func = function(req, res) {
		var request_ = new request(req, jnode);
		var response_ = new response(res, request_, sessions, jnode);
		var cancel_ = function() {
			continue_ = false;

			cancel(obj);
		}

		for(var i = 0; i < middlewares.length; i++) {
			continue_ = true;

			middlewares[i]("request", request_, response_, cancel_);

			if(!continue_) {
				return;
			}
		}

		for(var i = 0; i < routes.length; i++) {
			var route = routes[i];

			if(req.url.startsWith(route.url)) {
				if(route.method != "ALL" && route.method != request_.method()) {
					continue;
				}

				continue_ = true;

				route.func(request_, response_, cancel_);

				if(!continue_) {
					return;
				}
			}
		}
	}

	/**
	 * @function route
	 */
	self.route = function(url, method, override) {
		url = jnode.utils().check("string", url, "url");

		var method_ = "ALL";
		var override_ = false;

		if(jnode.utils().is().string(method)) {
			method_ = method;

			if(jnode.utils().is().boolean(override)) {
				override_ = override;
			}
		}
		else if(jnode.utils().is().boolean(method)) {
			override_ = override
		}

		return jnode.promise(function(event) {
			for(var i = 0; i < routes.length; i++) {
				if(routes[i].url.startsWith(url) && !override_) {
					return event("error", "The route " + url + " is not unique!");
				}
			}

			routes[routes.length] = {
				url: url,
				method: method_,
				func: function(req, res) {
					event("request", req, res);
				}
			}
		});
	}

	/**
	 * @function get
	 */
	self.get = function(url, override) {
		return self.route(url, "GET", override);
	}

	/**
	 * @function put
	 */
	self.put = function(url, override) {
		return self.route(url, "PUT", override);
	}

	/**
	 * @function post
	 */
	self.post = function(url, override) {
		return self.route(url, "POST", override);
	}

	/**
	 * @function delete
	 */
	self.delete = function(url, override) {
		return self.route(url, "DELETE", override);
	}

	/**
	 * @function head
	 */
	self.head = function(url, override) {
		return self.route(url, "DELETE", override);
	}

	/**
	 * @function remove
	 */
	self.remove = function(url) {
		url = jnode.utils().check("string", url, "url");

		for(var i = 0; i < routes.length; i++) {
			if(routes[i].url == url) {
				routes.splice(i);
			}
		}
	}

	/**
	 * @function use
	 */
	self.use = function() {
		return jnode.promise(function(event) {
			middlewares[middlewares.length] = event;
		});
	}

	return self;
}