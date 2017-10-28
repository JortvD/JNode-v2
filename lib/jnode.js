/**
 * @module jnode
 */
module.exports = function() {
	var self = {};

	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.split(search).join(replacement);
	};

	/**
	 * @function utils
	 */
	self.utils = function() {
		return utils;
	}

	/**
	 * @function exit
	 */
	self.exit = function(code) {
		code = code || 0;

		process.exit(code);
	}

	/**
	 * @function logger
	 */
	self.logger = function() {
		return logger;
	}

	/**
	 * @function router
	 */
	self.router = function() {
		return router;
	}

	/**
	 * @function info
	 */
	self.info = function() {
		return info;
	}

	/**
	 * @function settings
	 */
	self.settings = function() {
		return settings;
	}

	/**
	 * @function api
	 */
	self.api = function() {
		return api;
	}

	/**
	 * @function start
	 */
	self.start = function() {
		return self.promise(function(event) {
			server.start().stack(event);
		});
	}

	/**
	 * @function stop
	 */
	self.stop = function() {
		return self.promise(function(event) {
			server.stop().stack(event);
		});
	}

	/**
	 * @function file
	 */
	self.file = function(path) {
		return new file(self, path);
	}

	/**
	 * @function folder
	 */
	self.folder = function(path) {
		return new folder(self, path);
	}

	/**
	 * @function uuid
	 */
	self.uuid = function() {
		return new uuid();
	}

	/**
	 * @function promise
	 */
	self.promise = function(func) {
		return new promise(self, func);
	}

	/**
	 * @function validator
	 */
	self.validator = function() {
		return validator;
	}

	/**
	 * @function model
	 */
	self.model = function(name) {
		return load_module(models, "models", name);
	}

	/**
	 * @function library
	 */
	self.library = function(name) {
		return load_module(libraries, "libraries", name);
	}

	/**
	 * @function helper
	 */
	self.helper = function(name) {
		return load_function(helpers, "helpers", name);
	}

	/**
	 * @function favicon
	 */
	self.favicon = function(path) {
		if(!path.startsWith(self.settings().root())) {
			path = self.settings().root() + path;
		}

		self.file(path).read()
		.then(function(file) {
			self.router().get()
			.then(function(req, res) {
				res.file(file.data());
			});
		});
	}
	
	/**
	 * @function view
	 */
	self.view = function(url, filename) {
		return self.jnode(function(event) {
			url = jnode.utils().check("string", url, "url");
			filename = jnode.utils().check("string", filename, "filename");

			var path = "";

			if(filename.startsWith(self.settings().root())) {
				path = filename + ".html";
			}
			else {
				path = self.settings().root() + self.settings().directories().views() + "/" + filename + ".html";
			}

			self.file(path).read()
			.then(function(file) {
				self.router().get(url)
				.then(function(req, res) {
					res.file(file);
				});

				event("finish");
			});
		});
	}

	/**
	 * @function assets
	 */
	self.assets = function(folder, type) {
		return self.promise(function(event) {
			folder = jnode.utils().check("string", folder, "folder");
			var path = "";

			if(folder.startsWith(self.settings().root())) {
				path = folder + ".html";
			}
			else {
				path = self.settings().root() + self.settings().directories().assets() + "/" + folder + "/";
			}

			self.folder(path).files()
			.on("file", function(file, last) {
				file.read()
				.then(function() {
					event("file", file);

					self.router().get("/" + folder + "/" + file.name())
					.then(function(req, res) {
						res.type(type || file.type());
						res.file(file);
					});

					if(last) {
						event("finish");
					}
				});
			});
		});
	}

	/**
	 * @function database
	 */
	self.database = function() {
		return database;
	}

	/**
	 * @function locales
	 */
	self.locales = function() {
		return locales;
	}

	/**
	 * @function xss
	 */
	self.xss = function(data) {
		data = jnode.utils().check("string", data, "data");

		return xss(data);
	}

	/**
	 * @function event
	 */
	self.event = function() {
		return event;
	}

	/**
	 * @function request
	 */
	self.request = function(...args) {
		return request(...args);
	}

	/**
	 * @function security
	 */
	self.security = function() {
		return security;
	}

	/**
	 * @function image
	 */
	self.image = function(path) {
		return new image(self, path);
	}

	/**
	 * @function compression
	 */
	self.compression = function(type) {
		return new compression(self, type);
	}

	/**
	 * @function plugins
	 */
	self.plugins = function() {
		return plugins;
	}

	var logger = require("./helpers/logger")(self);
	var utils = require("./utils/utils")();
	var event = require("./helpers/event")(self);
	var info = require("./info")();
	var settings = require("./settings")(self);
	var api = require("./api/api")(self);
	var database = require("./database/database")(self);
	var compression = require("./utils/compression");
	var file = require("./utils/file");
	var folder = require("./utils/folder");
	var server = require("./server")(self);
	var uuid = require("./utils/uuid");
	var validator = require("./helpers/validator")(self);
	var router = require("./routing/router")(server, self);
	var promise = require("./utils/promise");
	var locales = require("./helpers/locales")(self);
	var security = require("./security/security")(self);
	var plugins = require("./helpers/plugins")(self);
	var image = require("./utils/image");
	var xss = require("xss");
	var request = require("request");

	var models = {};
	var libraries = {};
	var helpers = {};

	var load_module = function(array, tag, name) {
		if(array[name] != null) {
			return array[name];
		}
		else {
			return array[name] = require(
				self.settings().root() + 
				self.settings().directories()[tag]() + "/" + 
				name);
		}
	}

	var load_function = function(array, tag, name) {
		if(array[name] != null) {
			return array[name];
		}
		else {
			return array[name] = require(
				self.settings().root() + 
				self.settings().directories()[tag]() + "/" + 
				name)(jnode);
		}
	}

	return self;
}