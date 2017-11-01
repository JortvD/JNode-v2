/**
 * @module request
 */
module.exports = function(request, jnode) {
	var self = {};

	var accepts = require("accepts")(request);
	var typeis = require("type-is");

	var url = require("url").parse(request.url, true);
	var body = "";

	if(request.method == 'POST') {
		request.on('data', function(data) {
			body += data;
		});
	}

	/**
	 * @module request/remote
	 */
	self.remote = function() {
		var self_ = {};

		/**
		 * @function address
		 */
		self_.address = function() {
			return request.socket.remoteAddress;
		}

		/**
		 * @function port
		 */
		self_.port = function() {
			return request.socket.remotePort;
		}

		/**
		 * @function family
		 */
		self_.family = function() {
			return request.socket.remoteFamily;
		}

		return self_;
	}

	/**
	 * @module request/local
	 */
	self.local = function() {
		var self_ = {};

		/**
		 * @function address
		 */
		self_.address = function() {
			return request.socket.localAddress;
		}

		/**
		 * @function port
		 */
		self_.port = function() {
			return request.socket.localPort;
		}

		return self_;
	}

	/**
	 * @function url
	 */
	self.url = function() {
		return request.url;
	}

	/**
	 * @function method
	 */
	self.method = function() {
		return request.method;
	}

	/**
	 * @function version
	 */
	self.version = function() {
		return request.httpVersion;
	}

	/**
	 * @function protocol
	 */
	self.protocol = function() {
		return url.protocol;
	}

	/**
	 * @function header
	 */
	self.header = function(key) {
		key = jnode.utils().check("string", key, "key");

		return request.headers[key];
	}

	/**
	 * @function headers
	 */
	self.headers = function() {
		return request.headers;
	}

	/**
	 * @function cookie
	 */
	self.cookie = function(key) {
		key = jnode.utils().check("string", key, "key");

		if(request.headers["set-cookie"] == null) {
			return null;
		}

		return request.headers["set-cookie"][key];
	}

	/**
	 * @function hostname
	 */
	self.hostname = function() {
		return url.hostname;
	}

	/**
	 * @function path
	 */
	self.path = function() {
		return url.path;
	}

	/**
	 * @function origin
	 */
	self.origin = function() {
		return url.origin;
	}

	/**
	 * @function href
	 */
	self.href = function() {
		return url.href;
	}

	/**
	 * @function port
	 */
	self.port = function() {
		return url.port;
	}

	/**
	 * @function hash
	 */
	self.hash = function() {
		return url.hash;
	}

	/**
	 * @module request/auth
	 */
	self.auth = function() {
		var self_ = {};

		/**
		 * @function username
		 */
		self_.username = function() {
			return url.username;
		}

		/**
		 * @function password
		 */
		self_.password = function() {
			return url.password;
		}

		return self_;
	}

	/**
	 * @module request/accepts
	 */
	self.accepts = function() {
		var self_ = {};

		/**
		 * @function type
		 */
		self_.type = function(type) {
			if(type == null) {
				return accepts.types();
			}

			return accepts.type(type);
		}

		/**
		 * @function encoding
		 */
		self_.encoding = function(encoding) {
			if(encoding == null) {
				return accepts.encodings();
			}

			return accepts.encoding(encoding);
		}

		/**
		 * @function charset
		 */
		self_.charset = function(charset) {
			if(charset == null) {
				return accepts.charsets();
			}

			return accepts.charset(charset);
		}

		/**
		 * @function language
		 */
		self_.language = function(language) {
			if(language == null) {
				return accepts.languages();
			}

			return accepts.language(language);
		}

		return self_;
	}

	/**
	 * @function agent
	 */
	self.agent = function() {
		return self.header("user-agent");
	}

	/**
	 * @function is
	 */
	self.is = function(types) {
		var arr = types || [];

		if(!Array.isArray(types)) {
			arr = new Array(arguments.length);

			for(var i = 0; i < arr.length; i++) {
				arr[i] = arguments[i];
			}
		}

		return typeis(request, arr);
	}

	/**
	 * @function get
	 */
	self.get = function(key) {
		key = jnode.utils().check("string", key, "key");

		if(self.method() == "POST") {
			if(jnode.is().string(body)) {
				body = JSON.parse(body);
			}

			return body[key];
		}
		else {
			return url.query[key];
		}

		return null;
	}

	/**
	 * @function xhr
	 */
	self.xhr = function() {
		var xhr = self.get('X-Requested-With') || "";
		return xhr.toLowerCase() == 'xmlhttprequest';
	}

	/**
	 * @function secure
	 */
	self.secure = function() {
		return self.protocol() == 'https';
	}

	return self;
}