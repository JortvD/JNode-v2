/**
 * @module settings
 */
module.exports = function(jnode) {
	var self = {};
	var settings = {};

	var zlib = require('zlib');

	/**
	 * @function setting
	 */
	self.setting = function(key, default_, func) {
		key = jnode.utils().check("string", key, "key");

		settings[key] = default_;

		if(func != null) {
			func(default_);
		}

		var keys = key.split(".");
		var self_ = self;

		for(var i = 0; i < keys.length; i++) {
			var key_ = keys[i];

			if(i < (keys.length - 1)) {
				if(self_[key_] == null) {
					var self__ = {};

					if(self_ instanceof Function) {
						self_()[key_] = function() {
							return self__;
						}
					}
					else {
						self_[key_] = function() {
							return self__;
						}
					}
					
					self_ = self__;
				}
				else {
					self_ = self_[key_]();
				}
			}
			else {
				var func_ = function(value) {
					if(value != null) {
						settings[key] = value;

						if(func != null) {
							func(default_);
						}
					}

					return settings[key];
				}

				if(self_ instanceof Function) {
					self_()[key_] = func_;
				}
				else {
					self_[key_] = func_;
				}
			}
		}
	}

	self.setting("port", 8080);
	self.setting("root", process.env.PWD);
	self.setting("compression.on", true);
	self.setting("compression.chunk", zlib.Z_DEFAULT_CHUNK);
	self.setting("compression.level", zlib.Z_DEFAULT_COMPRESSION);
	self.setting("compression.memory", zlib.Z_DEFAULT_MEMLEVEL);
	self.setting("compression.strategy", zlib.Z_DEFAULT_STRATEGY);
	self.setting("compression.flush", zlib.Z_NO_FLUSH);
	self.setting("compression.finish", zlib.Z_FINISH);
	self.setting("compression.threshold", 1000);
	self.setting("compression.window", zlib.Z_DEFAULT_WINDOWBITS);
	self.setting("compression.type", "gzip");
	self.setting("gc.global", false);
	self.setting("gc.old", 0);
	self.setting("gc.interval", -1);
	self.setting("gc.flush", true);
	self.setting("gc.ic", true);
	self.setting("gc.udn", true);
	self.setting("gc.compact.always", false);
	self.setting("gc.compact.code", true);
	self.setting("gc.sweeping", true);
	self.setting("socket.path", 0);
	self.setting("socket.files", 0);
	self.setting("socket.port", 0);
	self.setting("socket.path", 0);
	self.setting("socket.cleanup", 0);
	self.setting("extras", false, function(value) {

	});
	self.setting("strict", false, function(value) {

	});
	self.setting("reducer", false, function(value) {

	});
	self.setting("directories.locales", "locales");
	self.setting("directories.helpers", "helpers");
	self.setting("directories.models", "models");
	self.setting("directories.logs", "logs");
	self.setting("directories.libraries", "libraries");
	self.setting("directories.api", "api");
	self.setting("directories.policies", "policies");
	self.setting("directories.assets", "assets");
	self.setting("directories.views", "views");
	self.setting("urls.api", "api");
	self.setting("sessions.secret", "THIS_IS_A_SECRET");
	self.setting("sessions.cookie.http", true);
	self.setting("sessions.cookie.age", undefined);
	self.setting("sessions.cookie.path", "/");
	self.setting("sessions.cookie.same", true);
	self.setting("sessions.cookie.secure", false);
	self.setting("sessions.cookie.name", "_sessions");
	self.setting("sessions.cookie.proxy", false);
	self.setting("sessions.resave", false);
	self.setting("sessions.rolling", false);
	self.setting("sessions.safe", true);
	self.setting("sessions.unset", false);

	if(process.env.PWD == null) {
		self.root(process.cwd() + "/");
	}

	//console.log(self);

	return self;
}