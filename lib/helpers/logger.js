/**
 * @module logger
 */
module.exports = function(jnode) {
	var self = {};

	var fs = require("fs");
	var date = new Date();
	var file_date = date.getFullYear() + "_" +
					date.getMonth() + "_" +
					date.getDate() + "_" +
					date.getHours() + "_" +
					date.getMinutes() + "_" +
					date.getSeconds();
	var preset = "[%time%][%tag%]: %msg%";
	var transports = {};

	transports["console"] = {
		type: "console",
		level: 0
	}

	/**
	 * @module logger/transports
	 */
	self.transports = function() {
		var self_ = {};

		/**
		 * @function add
		 */
		self_.add = function(name, type, level, file) {
			name = name || jnode.utils().check("string", name, "name");
			type = type || "console";
			level = level || 0;

			if(type == "console") {
				transports[name] = {
					type: type,
					level: level
				}
			}
			else if(type == "file") {
				file = jnode.utils().check("string", file, "file");

				file = file.replace("%date%", file_date);
				file = jnode.settings().root() + jnode.settings().directories().logs() + file;

				if(!fs.existsSync(file)) {
					return;
				}

				transports[name] = {
					type: type,
					level: level,
					file: file
				}
			}
		}

		/**
		 * @function remove
		 */
		self_.remove = function(name) {
			name = jnode.utils().check("string", name, "name");
			
			transports[name] = null;
		}

		/**
		 * @function clear
		 */
		self_.clear = function() {
			transports = {};
		}

		/**
		 * @function list
		 */
		self_.list = function() {
			return transports;
		}

		return self_;
	}

	/**
	 * @module logger/levels
	 */
	self.levels = function() {
		var self_ = {};

		/**
		 * @function debug
		 */
		self_.debug = function() {
			return 0;
		}

		/**
		 * @function info
		 */
		self_.info = function() {
			return 1;
		}

		/**
		 * @function warn
		 */
		self_.warn = function() {
			return 2;
		}

		/**
		 * @function error
		 */
		self_.error = function() {
			return 3;
		}

		return self_;
	}

	/**
	 * @function info
	 */
	self.info = function(msg) {
		self.print(msg, "INFO", self.levels().info());
	}

	/**
	 * @function warn
	 */
	self.warn = function(msg) {
		self.print(msg, "WARN", self.levels().warn());
	}

	/**
	 * @function error
	 */
	self.error = function(msg) {
		if(jnode.utils().is().error(msg)) {
			self.print(msg.stack, "ERROR", self.levels().error());
		}
		else {
			self.print(msg, "ERROR", self.levels().error());
		}
	}

	/**
	 * @function debug
	 */
	self.debug = function(msg) {
		self.print(msg, "DEBUG", self.levels().debug());
	}

	/**
	 * @function preset
	 */
	self.preset = function(preset_) {
		if(preset_ != null) {
			preset = preset_;
		}

		return preset;
	}

	/**
	 * @function print
	 */
	self.print = function(msg, tag, level, time) {
		var d = new Date();

		tag = tag || "INFO";
		time = time || d.getHours() + ":" +
					   d.getMinutes() + ":" +
					   d.getSeconds() + "." +
					   d.getMilliseconds();
		msg = msg || jnode.utils().is().boolean(msg) ? msg : "";

		if(jnode.utils().contains(msg, "\n")) {
			var lines = jnode.utils().split(msg, "\n");

			for(var i = 0; i < lines.length; i++) {
				self.print(lines[i], tag, level, time);
			}

			return;
		}

		var message = preset;

		message = message.replace("%time%", time);
		message = message.replace("%tag%", tag);
		message = message.replace("%msg%", msg);

		for(var key in transports) {
			var transport = transports[key];

			if(transport.type == "console" && transport.level <= level) {
				console.log(message);
			}
			else if(transport.type == "file" && transport.level <= level) {
				fs.appendFile(transport.file, message + "\n", 'utf8', function(err) {
					if(err) {
						console.log(err);
					}
				});
			}
		}
	}

	return self;
}