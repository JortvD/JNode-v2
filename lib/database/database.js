/**
 * @module database
 */
module.exports = function(jnode) {
	var self = {};

	var driver = require("./mongo")(jnode);
	var driver_name = "mongo";

	/**
	 * @function driver
	 */
	self.driver = function(driver_) {
		driver_ = jnode.utils().check("string", driver_, "driver_");

		switch(driver_) {
			case "mongo":
				driver = require("./" + driver_)(jnode);
				driver_name = driver_;
				break;
		}

		return driver_name;
	}

	/**
	 * @function connect
	 */
	self.connect = function(domain, port, username, password) {
		return driver.connect(domain, port, username, password);
	}

	/**
	 * @module database/database
	 */
	self.database = function(name) {
		name = jnode.utils().check("string", name, "name");

		var self_ = {};
		var database = driver.database(name);

		/**
		 * @function clone
		 */
		self_.clone = function(newdb) {
			newdb = jnode.utils().check("string", newdb, "newdb");

			return database.clone(newdb);
		}

		/**
		 * @function close
		 */
		self_.close = function() {
			return database.close();
		}

		/**
		 * @function drop
		 */
		self_.drop = function() {
			return database.drop();
		}

		/**
		 * @module database/database/table
		 */
		self_.table = function(name) {
			name = jnode.utils().check("string", name, "name");

			var self_ = {};
			var table = database.table(name);

			/**
			 * @function close
			 */
			self_.close = function() {
				return database.close();
			}

			/**
			 * @function clear
			 */
			self_.clear = function() {
				return table.clear();
			}

			/**
			 * @function drop
			 */
			self_.drop = function() {
				return table.drop();
			}

			/**
			 * @function insert
			 */
			self_.insert = function(row) {
				row = jnode.utils().check("object", row, "row");

				return table.insert(row);
			}

			/**
			 * @function modify
			 */
			self_.modify = function(query, change) {
				query = jnode.utils().check("object", query, "query");
				change = jnode.utils().check("object", change, "change");

				return table.modify(query, change);
			}

			/**
			 * @function delete
			 */
			self_.delete = function(query) {
				query = jnode.utils().check("object", query, "query");

				return table.delete(query);
			}

			/**
			 * @function find
			 */
			self_.find = function(query) {
				query = jnode.utils().check("object", query, "query");

				return table.find(query);
			}

			/**
			 * @function count
			 */
			self_.count = function(query) {
				query = jnode.utils().check("object", query, "query");

				return table.count(query);
			}

			/**
			 * @function clone
			 */
			self_.clone = function(new_) {
				new_ = jnode.utils().check("string", new_, "new_");

				return table.clone(new_);
			}

			/**
			 * @module database/database/table/columns
			 */
			self_.columns = function() {
				var self_ = {};
				var columns = table.columns();

				/**
				 * @function add
				 */
				self_.add = function(name, datatype, options) {
					name = jnode.utils().check("string", name, "name");

					return columns.add(name, datatype, options);
				}

				/**
				 * @function drop
				 */
				self_.drop = function(name) {
					name = jnode.utils().check("string", name, "name");

					return column.drop(name);
				}

				/**
				 * @function modify
				 */
				self_.modify = function(name, options) {
					name = jnode.utils().check("string", name, "name");

					return column.modify(name, options);
				}

				return self_;
			}

			/**
			 * @module database/database/table/keys
			 */
			self_.keys = function() {
				var self_ = {};
				var keys = table.keys();

				/**
				 * @module database/database/table/keys/primary
				 */
				self_.primary = function() {
					var self_ = {};
					var primary = keys.primary();

					/**
					 * @function create
					 */
					self_.create = function(column) {
						column = jnode.utils().check("string", column, "column");

						return primary.create(column);
					}

					/**
					 * @function drop
					 */
					self_.drop = function() {
						return primary.drop();
					}

					return self_;
				}

				/**
				 * @module database/database/table/keys/secondary
				 */
				self_.secondary = function() {
					var self_ = {};
					var secondary = keys.secondary();

					/**
					 * @function create
					 */
					self_.create = function(name, column) {
						name = jnode.utils().check("string", name, "name");
						column = jnode.utils().check("string", column, "column");

						return secondary.create(name, column);
					}

					/**
					 * @function drop
					 */
					self_.drop = function(name) {
						name = jnode.utils().check("string", name, "name");

						return secondary.drop(name);
					}

					/**
					 * @function list
					 */
					self_.list = function() {
						return secondary.list();
					}
				}

				return self_;
			}

			return self_;
		}

		return self_;
	}

	return self;
}