/**
 * @module response
 */
module.exports = function(response, request, sessions, jnode) {
	var self = {};

	var mime = require("mime");
	var file = require("./../utils/file");
	var compression = jnode.compression(jnode.settings().compression().type());
	var cookies = {};

	/**
	 * @function status
	 */
	self.status = function(code) {
		if(code != null) {
			response.statusCode = code;
		}

		return response.statusCode;
	}

	/**
	 * @module response/headers
	 */
	self.headers = function() {
		var self_ = {};

		/**
		 * @function set
		 */
		self_.set = function(key, value) {
			key = jnode.utils().check("string", key, "key");
			value = jnode.utils().check("string", value, "value");

			value = Array.isArray(value) ? value.map(String) : String(value);

			response.setHeader(key, value);
		}

		/**
		 * @function get
		 */
		self_.get = function(key) {
			key = jnode.utils().check("string", key, "key");

			return response.getHeader(key);
		}

		/**
		 *@function has
		 */
		self_.has = function(key) {
			key = jnode.utils().check("string", key, "key");

			return response.hasHeader(key);
		}

		/**
		 * @function remove
		 */
		self_.remove = function(key) {
			key = jnode.utils().check("string", key, "key");

			response.removeHeader(key);
		}

		/**
		 * @function append
		 */
		self_.append = function(key, value) {
			key = jnode.utils().check("string", key, "key");
			value = jnode.utils().check("string", value, "value");

			var header = self_.get(key);
			var val = value;

			if(header) {
				val = Array.isArray(header) ? header.concat(value)
					: Array.isArray(value) ? [header].concat(value)
					: [header, value];
			}

			self_.set(key, val);
		}

		return self_;
	}

	var set_cookies = function() {
		for(var key in cookies) {
			self.headers().append("Set-Cookie", cookies[key]);
		}
	}

	/**
	 * @module response/cookies
	 */
	self.cookies = function() {
		var self_ = {};

		self_.set = function(key, value, options) {
			key = jnode.utils().check("string", key, "key");
			value = jnode.utils().check("string", value, "value");
			options = options || {};

			var str = key + "=" + value;

			if(options.age) {
				str += '; Max-Age=' + Math.floor(options.maxage);
			}

			if(options.domain) {
				str += '; Domain=' + options.domain;
			}

			if(options.path) {
				str += '; Path=' + options.path;
			}

			if(options.expires) {
				str += '; Expires=' + options.expires.toUTCString();
			}

			if(options.http) {
				str += '; HttpOnly';
			}

			if(options.secure) {
				str += '; Secure';
			}

			if(options.same) {
				switch(options.same) {
					case "lax":
						str += "; SameSite=Lax";
						return;
					case "strict":
					default:
						str += "; SameSite=Strict";
						return;
				}
			}

			cookies[key] = str;
		}

		self_.get = function(key) {
			return cookies[key];
		}

		self_.remove = function(key) {
			delete cookies[key];
		}

		self_.clear = function() {
			cookies = [];
		}

		return self_;
	}

	/**
	 * @module response/sessions
	 */
	self.sessions = sessions.get(self, request);

	/**
	 * @function location
	 */
	self.location = function(url) {
		url = jnode.utils().check("string", url, "url");

		if(url == "back") {
			url = self.headers().get("Referrer") || "/";
		}

		self.headers().set("Location", url);
	}

	/**
	 * @function redirect
	 */
	self.redirect = function(url) {
		url = jnode.utils().check("string", url, "url");

		self.location(url);
		self.status(302);
		self.end();
	}

	/**
	 * @function type
	 */
	self.type = function(type) {
		type = jnode.utils().check("string", type, "type");

		self.headers().set("Content-Type", mime.getType(type));
	}

	/**
	 * @function end
	 */
	self.end = function() {
		response.end();
	}

	/**
	 * @function send
	 */
	self.send = function(body, encoding) {
		body = body || "";
		encoding = encoding || "utf-8";

		if(typeof body == "object") {
			return self.json(body);
		}
		else {
			if(!self.headers().get("Content-Type")) {
				self.type("html");
			}
		}

		if(!self.headers().get("ETag")) {
			var length = 0;

			if(body.length < 1000) {
				length = Buffer.byteLength(body, encoding);
			}
			else if(!Buffer.idBuffer(body)) {
				body = Buffer.from(length, encoding);
				encoding = undefined;
				length = body.length;
			}
			else {
				length = body.length;
			}

			self.headers().set("Content-Length", length);
		}

		if(jnode.settings().compression().on() && 
			request.accepts().encoding(compression.settings().type())) {
			var compressed = compression.compress(body);

			if(!self.headers().get("ETag")) {
				self.headers().set("Content-Length", compressed.length);
			}

			self.header().set("Content-Encoding", compression.settings().type());

			response.end(compressed, encoding);
		}
		else {
			response.end(body, encoding);
		}
	}

	/**
	 * @function json
	 */
	self.json = function(body) {
		body = jnode.utils().check("object", body, "body");

		if(!self.headers().get("Content-Type")) {
			self.type("json");
		}

		self.send(JSON.stringify(body));
	}

	/**
	 * @function file
	 */
	self.file = function(file_) {
		file_ = jnode.utils().check("file", file_, "file_");

		self.send(file_.data());
	}

	/**
	 * @function download
	 */
	self.download = function(file_, name) {
		file = file || "";
		name = name || "file.txt";

		if(file_ instanceof file) {
			if(!self.headers().get("Content-Disposition")) {
				self.headers().set("Content-Disposition", "attachment; filename=" + file_.name());
			}

			self.file(file_);
		}
		else {
			if(!self.headers().get("Content-Disposition")) {
				self.headers().set("Content-Disposition", "attachment; filename=" + name);
			}

			self.send(file_);
		}
	}

	/**
	 * @function pipe
	 */
	self.pipe = function(file_) {
		file_ = jnode.utils().check("file", file_, "file_");
		
		file_.pipe(response);
	}

	var append = function(obj, path) {
		var locals = [];

		for(var key in obj) {
			if(typeof obj[key] == "object") {
				locals.concat(append(obj[key], path == "" ? key : path + "." + key));
			}
			else {
				locals[locals.length] = path == "" ? key : path + "." + key;
			}
		}

		return locals;
	}

	// TODO: FINISH
	/**
	 * @function render
	 */
	self.render = function(body, locals) {
		if(body instanceof file) {
			body = body.data();
		}

		locals = append(locals, "");

		for(var i = 0; i < locals.length; i++) {
			var local = locals[i];

			//body.replaceAll("{{" + local + "}}", );
		}
	}

	return self;
}