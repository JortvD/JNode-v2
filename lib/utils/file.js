/**
 * @module file
 */
module.exports = function(jnode, path) {
	var self = {};
	var data = null;
	var path_ = require('path');
	var fs = require('fs');
	var type = path_.extname(path);

	/**
	 * @function data
	 */
	self.data = function(data_) {
		if(data_ != null) {
			data = data_;
		}

		return data;
	}

	/**
	 * @function path
	 */
	self.path = function(path_) {
		if(path_ != null) {
			path = path_;
		}

		return path;
	}

	/**
	 * @function type
	 */
	self.type = function() {
		return type;
	}

	/**
	 * @function name
	 */
	self.name = function() {
		return path_.basename(path);
	}

	/**
	 * @function pipe
	 */
	self.pipe = function(response) {
		var stream = fs.createReadStream(path);
		stream.pipe(response);
	}

	/**
	 * @function append
	 */
	self.append = function(data_) {
		data_ = jnode.utils().check("string", data_, "data_");

		return jnode.promise(function(event) {
			fs.appendFile(path, data_, function(err) {
				if(err) {
					event("error", err);
				}

				data += data_;

				event("appended", self);
			});
		});
	}

	/**
	 * @function read
	 */
	self.read = function() {
		return jnode.promise(function(event) {
			fs.readFile(path, 'binary', function(err, data_) {
				if(err) {
					event("error", err);
				}

				data = data_;
				type = path_.extname(path);

				event("loaded", self);
			});
		});
	}

	/**
	 * @function mkdir
	 */
	self.mkdir = function() {
		return jnode.promise(function(event) {
			fs.mkdir(path, function(err) {
				if(err) {
					event("error", err);
				}

				event("created", self);
			});
		});
	}

	/**
	 * @function clear
	 */
	self.clear = function() {
		return jnode.promise(function(event) {
			fs.writeFile(path, "", function(err) {
				if(err) {
					event("error", err);
				}

				event("cleared", self);
			});
		});
	}

	/**
	 * @function copy
	 */
	self.copy = function() {
		//TODO: Add this function, that copies a file from one file to another file.
	}

	/**
	 * @function empty
	 */
	self.empty = function() {
		//TODO: Add this function, that checks if the file is empty.
	}

	/**
	 * @function realpath
	 */
	self.realpath = function() {
		//TODO: Add this function, that gets the real path of this file.
	}

	/**
	 * @function rename
	 */
	self.rename = function() {
		//TODO: Add this function, that renames this file.
	}

	/**
	 * @function watch
	 */
	self.watch = function() {
		//TODO: Add this function, that watches this file.
	}

	/**
	 * @module file/stats
	 */
	self.stats = function() {
		var self_ = {};

		/**
		 * @function size
		 */
		self_.size = function() {
			return jnode.promise(function(event) {
				fs.stat(path, function(err, stats) {
					if(err) {
						event("error", err);
					}

					event("stats", stats.size);
				});
			});
		}

		/**
		 * @function uid
		 */
		self_.uid = function() {
			return jnode.promise(function(event) {
				fs.stat(path, function(err, stats) {
					if(err) {
						event("error", err);
					}

					event("stats", stats.uid);
				});
			});
		}

		/**
		 * @function gid
		 */
		self_.gid = function() {
			return jnode.promise(function(event) {
				fs.stat(path, function(err, stats) {
					if(err) {
						event("error", err);
					}

					event("stats", stats.gid);
				});
			});
		}

		/**
		 * @function mode
		 */
		self_.mode = function() {
			return jnode.promise(function(event) {
				fs.stat(path, function(err, stats) {
					if(err) {
						event("error", err);
					}

					event("stats", stats.mode);
				});
			});
		}

		/**
		 * @function creation
		 */
		self_.creation = function() {
			return jnode.promise(function(event) {
				fs.stat(path, function(err, stats) {
					if(err) {
						event("error", err);
					}

					event("stats", stats.birthtime);
				});
			});
		}

		/**
		 * @function accessed
		 */
		self_.accessed = function() {
			return jnode.promise(function(event) {
				fs.stat(path, function(err, stats) {
					if(err) {
						event("error", err);
					}

					event("stats", stats.atime);
				});
			});
		}

		self_.modified = function() {
			return jnode.promise(function(event) {
				fs.stat(path, function(err, stats) {
					if(err) {
						event("error", err);
					}

					event("stats", stats.mtime);
				});
			});
		}

		/**
		 * @function changed
		 */
		self_.changed = function() {
			return jnode.promise(function(event) {
				fs.stat(path, function(err, stats) {
					if(err) {
						event("error", err);
					}

					event("stats", stats.changed);
				});
			});
		}

		/**
		 * @function dev
		 */
		self_.dev = function() {
			return jnode.promise(function(event) {
				fs.stat(path, function(err, stats) {
					if(err) {
						event("error", err);
					}

					event("stats", stats.dev);
				});
			});
		}

		return self_;
	}

	return self;
}