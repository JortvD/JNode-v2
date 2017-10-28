module.exports = function(jnode, path) {
	var self = {};
	var fs = require("fs");

	/**
	 * @function create
	 */
	self.create = function() {
		//TODO: Add this function, that creates a folder.
	}

	/**
	 * @function files
	 */
	self.files = function() {
		return jnode.promise(function(event) {
			fs.readdir(path, function(err, files) {
				if(err) {
					event("error");
					return;
				}

				files.forEach(function(filename, index) {
					event("file", jnode.file(path + filename), (index === (files.length - 1)));

					if(index == (files.length - 1)) {
						event("finish");
					}
				});
			});
		});
	}

	/**
	 * @function remove
	 */
	self.remove = function() {
		//TODO: Add this function, that removes a folder.
	}

	/**
	 * @function copy
	 */
	self.copy = function() {
		//TODO: Add this function, that copies a folder from one folder to another folder.
	}

	/**
	 * @function empty
	 */
	self.empty = function() {
		//TODO: Add this function, that checks if the folder is empty.
	}

	/**
	 * @function realpath
	 */
	self.realpath = function() {
		//TODO: Add this function, that gets the real path of this folder.
	}

	/**
	 * @function rename
	 */
	self.rename = function() {
		//TODO: Add this function, that renames this folder.
	}

	/**
	 * @function watch
	 */
	self.watch = function() {
		//TODO: Add this function, that watches this folder.
	}

	return self;
}