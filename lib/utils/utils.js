/**
 * @module utils
 */
module.exports = function() {
	var self = {};

	var promise = require("./promise");

	/**
	 * @function type
	 */
	self.type = function(obj) {
		return typeof obj;
	}

	/**
	 * @function clone
	 */
	self.clone = function(obj) {
		if(self.is().array(obj)) {
			return obj.slice(0);
		}

		if(obj === null) {
			return null;
		}

		switch(self.type(obj)) {
			case "object":
				if(self.is().date(obj)) {
					return new Date(obj.getTime());
				}
				else {
					return Object.assign({}, obj);
				}
			case "number":
			case "string":
				return obj;
		}

		return;
	}

	/**
	 * @function now
	 */
	self.now = function() {
		return Date.now();
	}

	/**
	 * @function keys
	 */
	self.keys = function(obj) {
		if(obj === null) {
			return null;
		}
		else if(self.is().object(obj)) {
			return Object.keys(obj);
		}
	}

	/**
	 * @function values
	 */
	self.values = function(obj) {
		if(obj === null) {
			return null;
		}
		else if(self.is().object(obj)) {
			return Object.values(obj);
		}
	}

	/**
	 * @function size
	 */
	self.size = function(obj) {
		if(obj === null) {
			return 0;
		}
		else if(self.is().array(obj)) {
			return obj.length;
		}
		else if(self.is().object(obj)) {
			return self.keys(obj).length;
		}
		else if(self.is().string(obj)) {
			return obj.length;
		}
		else if(self.is().number(obj)) {
			return obj;
		}
	}

	/**
	 * @function concat
	 */
	self.concat = function(obj, ...objs) {
		if(self.is().array(obj)) {
			var arr = self.clone(obj);

			for(var i = 0; i < objs.length; i++) {
				var obj_ = objs[i];

				if(self.is().array(obj_)) {
					arr = arr.concat(obj_);
				}
				else if(self.is().string(obj_) || self.is().number(obj_)) {
					arr[arr.length] = obj_;
				}
			}

			return arr;
		}
	}

	/**
	 * @function check
	 */
	self.check = function(type, value, name) {
		if(type == null || name == null) {
			return;
		}
		else if(type == "string" && !self.is().string(value)) {
			throw new TypeError("The parameter `" + name + "` must be a string!");
			process.exit(1);
		}
		else if(type == "number" && !self.is().number(value)) {
			throw new TypeError("The parameter `" + name + "` must be a number!");
			process.exit(1);
		}
		else if(type == "object" && !self.is().object(value)) {
			throw new TypeError("The parameter `" + name + "` must be an object!");
			process.exit(1);
		}
		else if(type == "function" && !self.is().function(value)) {
			throw new TypeError("The parameter `" + name + "` must be a function!");
			process.exit(1);
		}
		else if(type == "array" && !self.is().array(value)) {
			throw new TypeError("The parameter `" + name + "` must be an array!");
			process.exit(1);
		}
		else if(type == "error" && !self.is().error(value)) {
			throw new TypeError("The parameter `" + name + "` must be an error!");
			process.exit(1);
		}
		else if(type == "file" && !(value instanceof jnode.file())) {
			throw new TypeError("The parameter `" + name + "` must be a file!");
			process.exit(1);
		}

		return value;
	}

	/**
	 * @function insert
	 */
	self.insert = function(obj, ins, place) {
		if(obj == null || ins == null) {
			return;
		}
		else if(place == null) {
			place = self.size(obj);
		}

		if(self.is().array(obj)) {
			var arr = [];

			for(var i = 0; i < obj.length; i++) {
				if(i == place) {
					if(self.is().array(ins)) {
						for(var j = 0; j < ins.length; j++) {
							arr[arr.length] = ins[j];
						}
					}
					else {
						arr[arr.length] = ins;
					}
				}

				arr[arr.length] = obj[i];

				if((i + 1) == place) {
					if(self.is().array(ins)) {
						for(var j = 0; j < ins.length; j++) {
							arr[arr.length] = ins[j];
						}
					}
					else {
						arr[arr.length] = ins;
					}
				}
			}

			return arr;
		}
	}

	/**
	 * @function arrayify
	 */
	self.arrayify = function(...objs) {
		if(objs == null || objs == undefined || objs.length == 0) {
			return;
		}

		return self.concat([], ...objs);
	}

	/**
	 * @function chunk
	 */
	self.chunk = function(obj, size) {
		if(self.is().array(obj) && self.is().number(size)) {
			var arr = [];
			var sub = [];

			for(var i = 0; i < obj.length; i++) {
				sub[sub.length] = obj[i];

				if(sub.length == size || i == (obj.length - 1)) {
					arr[arr.length] = sub;
					sub = [];
				}
			}

			return arr;
		}
	}

	/**
	 * @function delay
	 */
	self.delay = function(timeout, ...args) {
		if(self.is().number(timeout)) {
			return new promise(null, function(event) {
				setTimeout(function() {
					event("done", ...args);
				}, timeout);
			});
		}
	}

	/**
	 * @function once
	 */
	self.once = function(...args) {
		return self.multiple(1, args);
	}

	/**
	 * @function functionify
	 */
	self.functionify = function(obj) {
		return function() {
			return obj;
		}
	}

	/**
	 * @function multiple
	 */
	self.multiple = function(amount, ...args) {
		if(self.is().number(obj)) {
			return new promise(function(event) {
				for(var i = 0; i < amount; i++) {
					event("done", ...args);
				}
			});
		}
	}

	/**
	 * @function stringify
	 */
	self.stringify = function(obj) {
		if(self.is().array(obj)) {
			return obj.toString();
		}
		else if(self.is().object(obj)) {
			return JSON.stringify(obj);
		}
		else if(self.is().date(obj)) {
			return obj.toString();
		}
		else if(self.is().number(obj)) {
			return obj + "";
		}
		else if(self.is().string(obj)) {
			return obj;
		}
	}

	/**
	 * @function slice
	 */
	self.slice = function(obj, num1, num2) {
		num2 = num2 || num1 + 1;

		if(self.is().array(obj)) {
			return obj.slice(num1, num2);
		}
	}

	/**
	 * @function compact
	 */
	self.compact = function(obj) {
		if(self.is().array(obj)) {
			var arr = [];

			for(var i = 0; i < obj.length; i++) {
				if(obj[i]) {
					arr[arr.length] = obj[i];
				}
			}

			return arr;
		}
	}

	/**
	 * @function after
	 */
	self.after = function(obj, num) {
		num = num || 1;

		if(!self.is().number(num)) {
			return;
		}

		if(self.is().array(obj)) {
			if(obj.length < num) {
				return;
			}

			var arr = [];

			for(var i = 0; i < num; i++) {
				arr[arr.length] = obj[obj.length - num + i];
			}

			return arr;
		}
		else if(self.is().string(obj)) {
			return obj.substring(obj.length - num, obj.length);
		}
	}

	/**
	 * @function unique
	 */
	self.unique = function(obj) {
		if(self.is().array(obj)) {
			var occ = {};
			var arr = [];

			for(var i = 0; i < obj.length; i++) {
				if(!occ[obj[i]]) {
					occ[obj[i]] = true;
					arr = obj[i];
				}
			}

			return arr;
		}
	}

	/**
	 * @function before
	 */
	self.before = function(obj, num) {
		num = num || 1;

		if(!self.is().number(num)) {
			return;
		}

		if(self.is().array(obj)) {
			if(obj.length < num) {
				return;
			}

			var arr = [];

			for(var i = 0; i < num; i++) {
				arr[i] = obj[i];
			}

			return arr;
		}
		else if(self.is().string(obj)) {
			return obj.substring(0, num);
		}
	}

	/**
	 * @function contains
	 */
	self.contains = function(obj, val) {
		if(self.is().array(obj)) {
			for(var i = 0; i < obj.length; i++) {
				if(obj[i] == val) {
					return true;
				}
			}

			return false;
		}
		else if(self.is().string(obj)) {
			return obj.includes(val);
		}
	}

	/**
	 * @function drop
	 */
	self.drop = function(obj, num) {
		if(self.is().array(obj)) {
			if(num > 0) {
				var arr = [];

				for(var i = num; i < obj.length; i++) {
					arr[arr.length] = obj[i];
				}

				return arr;
			}
			else if(num < 0) {
				num = -num;
				var arr = [];

				for(var i = 0; i < obj.length - num; i++) {
					arr[arr.length] = obj[i];
				}

				return arr;
			}
		}
		else if(self.is().string(obj)) {
			if(num > 0) {
				return obj.substring(num, obj.length);
			}
			else if(num < 0) {
				num = -num;
				return obj.substring(0, obj.length - num);
			}
		}
	}

	/**
	 * @function fill
	 */
	self.fill = function(obj, rep) {
		if(self.is().array(obj)) {
			var arr = [];

			for(var i = 0; i < obj.length; i++) {
				arr[arr.length] = rep;
			}

			return arr;
		}
		else if(self.is().string(obj)) {
			var str = "";

			for(var i = 0; i < obj.length; i++) {
				str += rep;
			}

			return str;
		}
	}

	/**
	 * @function capitalize
	 */
	self.capitalize = function(obj) {
		if(self.is().string(obj)) {
			return obj.toUpperCase();
		}
		else if(self.is().array(obj)) {
			var arr = [];

			for(var i = 0; i < obj.length; i++) {
				var obj_ = self.capitalize(obj[i]);

				if(obj_ != null) {
					arr[arr.length] = obj_;
				}
				else {
					arr[arr.length] = obj[i];
				}
			}

			return arr;
		}
	}

	/**
	 * @function decapitalize
	 */
	self.decapitalize = function(obj) {
		if(self.is().string(obj)) {
			return obj.toLowerCase();
		}
		else if(self.is().array(obj)) {
			var arr = [];

			for(var i = 0; i < obj.length; i++) {
				var obj_ = self.decapitalize(obj[i]);

				if(obj_ != null) {
					arr[arr.length] = obj_;
				}
				else {
					arr[arr.length] = obj[i];
				}
			}

			return arr;
		}
	}

	/**
	 * @function repeat
	 */
	self.repeat = function(obj, multiplier) {
		if(self.is().string(obj)) {
			var str = "";

			for(var i = 0; i < multiplier; i++) {
				str += obj;
			}

			return str;
		}
		else if(self.is().array(obj)) {
			var arr = [];

			for(var i = 0; i < multiplier; i++) {
				arr = self.concat(arr, obj);
			}

			return arr;
		}
	}

	/**
	 * @function add
	 */
	self.add = function(obj, ...args) {
		if(self.is().number(obj)) {
			var n = obj;

			for(var i = 0; i < args.length; i++) {
				n += args[i];
			}

			return n;
		}
	}

	/**
	 * @function remove
	 */
	self.remove = function(obj, ...args) {
		if(self.is().number(obj)) {
			var n = obj;

			for(var i = 0; i < args.length; i++) {
				n -= args[i];
			}

			return n;
		}
	}

	/**
	 * @function devide
	 */
	self.devide = function(obj, ...args) {
		if(self.is().number(obj)) {
			var n = obj;

			for(var i = 0; i < args.length; i++) {
				n /= args[i];
			}

			return n;
		}
	}

	/**
	 * @function multiply
	 */
	self.multiply = function(obj, ...args) {
		if(self.is().number(obj)) {
			var n = obj;

			for(var i = 0; i < args.length; i++) {
				if(self.is().number(args[i])) {
					n *= args[i];
				}
			}

			return n;
		}
	}

	/**
	 * @function max
	 */
	self.max = function(obj) {
		if(self.is().array(obj)) {
			var highest = null;

			for(var i = 0; i < obj.length; i++) {
				if(self.is().number(obj[i])) {
					if(highest == null) {
						highest = obj[i];
					}

					if(obj[i] > highest) {
						highest = obj[i];
					}
				}
			}

			return highest;
		}
	}

	/**
	 * @function min
	 */
	self.min = function(obj) {
		if(self.is().array(obj)) {
			var lowest = null;

			for(var i = 0; i < obj.length; i++) {
				if(self.is().number(obj[i])) {
					if(lowest == null) {
						lowest = obj[i];
					}

					if(obj[i] < lowest) {
						lowest = obj[i];
					}
				}
			}

			return lowest;
		}
	}

	// Is this needed?
	/**
	 * @function sum
	 */
	self.sum = function(obj) {
		if(self.is().array(obj)) {
			var sum = 0;

			for(var i = 0; i < obj[i]; i++) {
				if(self.is().number(obj[i])) {
					sum += obj[i];
				}
			}

			return sum;
		}
	}

	/**
	 * @function assign
	 */
	self.assign = function(obj, obj_) {
		if(self.is().object(obj) && self.is().object(obj_)) {
			return Object.assign(obj, obj_);
		}
	}

	/**
	 * @function reverse
	 */
	self.reverse = function(obj) {
		if(self.is().array(obj)) {
			var arr = [];

			for(var i = 0; i < obj.length; i++) {
				arr[arr.length] = obj[obj.length - i];
			}

			return arr;
		}
	}

	/**
	 * @function starts
	 */
	self.starts = function(obj, val) {
		if(self.is().string(obj) && self.is().string(val)) {
			return obj.startsWith(val);
		}
	}

	/**
	 * @function ends
	 */
	self.ends = function(obj, val) {
		if(self.is().string(obj) && self.is().string(val)) {
			return obj.endsWith(val);
		}
	}

	/**
	 * @function split
	 */
	self.split = function(obj, splitter) {
		splitter = splitter || ",";

		if(self.is().string(obj)) {
			return obj.split(splitter);
		}
	}

	/**
	 * @function trim
	 */
	self.trim = function(obj) {
		if(self.is().string(obj)) {
			return obj.trim();
		}
	}

	/**
	 * @function padding
	 */
	self.padding = function(obj, num, padding) {
		padding = padding || " ";

		if(self.is().string(obj)) {
			for(var i = 0; i < num; i++) {
				obj = padding + obj + padding; 
			}

			return obj;
		}
	}

	/**
	 * @function bytes
	 */
	self.bytes = function(obj) {
		if(self.is().number(obj)) {
			var str = "";

			if(obj < 0) {
				str += "-";
				obj = -obj;
			}

			if(obj < 500) {
				str += obj + "B";
			}
			else if(obj < 500000) {
				str += (obj/1000) + "KB";
			}
			else if(obj < 500000000) {
				str += (obj/1000000) + "MB";
			}
			else if(obj < 500000000000) {
				str += (obj/1000000000) + "GB";
			}
			else if(obj < 500000000000000) {
				str += (obj/1000000000000) + "TB";
			}
			else if(obj < 500000000000000000) {
				str += (obj/1000000000000000) + "PB";
			}

			return str;
		}
	}

	/**
	 * @function normalize
	 */
	self.normalize = function(obj, type) {
		type = type || "NFC";

		if(self.is().string(obj)) {
			return obj.normalize(type);
		}
	}

	/**
	 * @function sorted
	 */
	self.sorted = function() {
		return require("./sorted")();
	}

	/**
	 * @module utils/is
	 */
	self.is = function() {
		var self_ = {};

		/**
		 * @function date
		 */
		self_.date = function(obj) {
			return obj instanceof Date;
		}

		/**
		 * @function string
		 */
		self_.string = function(obj) {
			return typeof obj === "string";
		}

		/**
		 * @function object
		 */
		self_.object = function(obj) {
			return typeof obj === "object";
		}

		/**
		 * @function number
		 */
		self_.number = function(obj) {
			return typeof obj === "number";
		}

		/**
		 * @function function
		 */
		self_.function = function(obj) {
			return typeof obj === "function";
		}

		/**
		 * @function array
		 */
		self_.array = function(obj) {
			return obj instanceof Array;
		}

		/**
		 * @function boolean
		 */
		self_.boolean = function(obj) {
			return typeof obj === "boolean";
		}

		/**
		 * @function error
		 */
		self_.error = function(obj) {
			return obj instanceof Error;
		}

		return self_;
	}

	return self;
}