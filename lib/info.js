/**
 * @module info
 */
module.exports = function() {
	var self = {};

	var os = require("os");
	var si = require("systeminformation");
	var promise = require("./utils/promise");

	/**
	 * @function uptime
	 */
	self.uptime = function() {
		return process.uptime();
	}

	/**
	 * @function version
	 */
	self.version = function() {
		return process.version;
	}

	/**
	 * @module info/dirs
	 */
	self.dirs = function() {
		var self_ = {};

		/**
		 * @function home
		 */
		self_.home = function() {
			return os.homedir();
		}

		/**
		 * @function temp
		 */
		self_.temp = function() {
			return os.tmpdir();
		}

		return self_;
	}

	/**
	 * @module info/os
	 */
	self.os = function() {
		var self_ = {};

		/**
		 * @function hostname
		 */
		self_.hostname = function() {
			return os.hostname();
		}

		/**
		 * @function eol
		 */
		self_.eol = function() {
			return os.EOL;
		}

		/**
		 * @function platform
		 */
		self_.platform = function() {
			return os.platform();
		}

		/**
		 * @function release
		 */
		self_.release = function() {
			return os.release();
		}

		/**
		 * @function type
		 */
		self_.type = function() {
			return os.type();
		}

		return self_;
	}

	/**
	 * @module info/memory
	 */
	self.memory = function() {
		var self_ = {};

		/**
		 * @module info/memory/system
		 */
		self_.system = function() {
			var self__ = {};

			/**
			 * @function free
			 */
			self__.free = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.free);
					});
				});
			}

			/**
			 * @function total
			 */
			self__.total = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.total);
					});
				});
			}

			/**
			 * @function used
			 */
			self__.used = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.free);
					});
				});
			}

			/**
			 * @function active
			 */
			self__.active = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.active);
					});
				});
			}

			/**
			 * @function cache
			 */
			self__.cache = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.buffcache);
					});
				});
			}

			/**
			 * @function available
			 */
			self__.available = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.available);
					});
				});
			}

			return self__;
		}

		/**
		 * @module info/memory/heap
		 */
		self_.heap = function() {
			var self__ = {};

			/**
			 * @function free
			 */
			self__.free = function() {
				var usage = process.memoryUsage();
				return usage.heapTotal - usage.heapUsed;
			}

			/**
			 * @function used
			 */
			self__.used = function() {
				var usage = process.memoryUsage();
				return usage.heapUsed;
			}

			/**
			 * @function total
			 */
			self__.total = function() {
				var usage = process.memoryUsage();
				return usage.heapTotal;
			}
		}

		/**
		 * @module info/memory/misc
		 */
		self_.misc = function() {
			var self__ = {};

			/**
			 * @function rss
			 */
			self__.rss = function() {
				var usage = process.memoryUsage();
				return usage.rss;
			}

			/**
			 * @function external
			 */
			self__.external = function() {
				var usage = process.memoryUsage();
				return usage.external;
			}

			return self__;
		}

		/*self_.sticks = function() {
			var self__ = {};

			self__.size = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.size);
					});
				});
			}

			self__.type = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.type);
					});
				});
			}

			self__.bank = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.bank);
					});
				});
			}

			self__.speed = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.clockSpeed);
					});
				});
			}

			self__.form = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.formFactor);
					});
				});
			}

			self__.part = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.partNum);
					});
				});
			}

			self__.serial = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.serialNum);
					});
				});
			}

			self__.voltage = function() {
				return new promise(function(event) {
					si.mem(function(data) {
						event("data", data.voltageConfigured);
					});
				});
			}

			return self__;
		}*/

		return self_;
	}

	/**
	 * @module info/network
	 */
	self.networks = function() {
		var networks = [];
		var interfaces = os.networkInterfaces();

		for(var i = 0; i < interfaces.length; i++) {
			var interface = intefaces[i][0];
			var self_ = {};

			if(interface == null) {
				continue;
			}

			/**
			 * @function address
			 */
			self_.address = function() {
				return interface.address;
			}

			/**
			 * @function mask
			 */
			self_.mask = function() {
				return interface.netmask;
			}

			/**
			 * @function family
			 */
			self_.family = function() {
				return interface.family;
			}

			/**
			 * @function mac
			 */
			self_.mac = function() {
				return interface.mac;
			}

			/**
			 * @function internal
			 */
			self_.internal = function() {
				return interface.internal;
			}

			/**
			 * @function scope
			 */
			self_.scope = function() {
				return interface.scopeid;
			}

			/**
			 * @function cidr
			 */
			self_.cidr = function() {
				return interfance.cdir;
			}

			networks[i] = self_;
		}

		return networks;
	}

	/**
	 * @module info/cpu
	 */
	self.cpu = function() {
		var self_ = {};

		/**
		 * @module info/cpu/core
		 */
		self_.cores = function() {
			var cores = [];
			var cpus = os.cpus();

			for(var i = 0; i < cpus.length; i++) {
				var self__ = {};
				var cpu = cpus[i];

				/**
				 * @function model
				 */
				self__.model = function() {
					return cpu.model;
				}

				/**
				 * @function speed
				 */
				self__.speed = function() {
					return cpu.speed;
				}

				/**
				 * @module  info/cpu/core/times
				 */
				self__.times = function() {
					var self___ = {};

					/**
					 * @function user
					 */
					self___.user = function() {
						return cpu.times.user;
					}

					/**
					 * @function nice
					 */
					self___.nice = function() {
						return cpu.times.nice;
					}

					/**
					 * @function sys
					 */
					self___.sys = function() {
						return cpu.times.sys;
					}

					/**
					 * @function idle
					 */
					self___.idle = function() {
						return cpu.times.idle;
					}

					/**
					 * @function irq
					 */
					self___.irq = function() {
						return cpu.times.irq;
					}

					return self___;
				}

				cores[i] = self__;
			}

			return cores;
		}

		/**
		 * @function arch
		 */
		self_.arch = function() {
			return os.arch();
		}

		/**
		 * @function endianness
		 */
		self_.endianness = function() {
			return os.endianness();
		}

		/**
		 * @function load
		 */
		self_.load = function() {
			return os.loadavg();
		}

		/**
		 * @function vendor
		 */
		self_.vendor = function() {
			return new promise(function(event) {
				si.cpu(function(data) {
					event("data", data.vendor);
				});
			});
		}

		/**
		 * @function manufacterer
		 */
		self_.manufacterer = function() {
			return new promise(function(event) {
				si.cpu(function(data) {
					event("data", data.manufacterer);
				});
			});
		}

		/**
		 * @function brand
		 */
		self_.brand = function() {
			return new promise(function(event) {
				si.cpu(function(data) {
					event("data", data.brand);
				});
			});
		}

		/**
		 * @function model
		 */
		self_.model = function() {
			return new promise(function(event) {
				si.cpu(function(data) {
					event("data", data.model);
				});
			});
		}

		/**
		 * @function family
		 */
		self_.family = function() {
			return new promise(function(event) {
				si.cpu(function(data) {
					event("data", data.family);
				});
			});
		}

		/**
		 * @function cache
		 */
		self_.cache = function() {
			return new promise(function(event) {
				si.cpu(function(data) {
					event("data", data.cache);
				});
			});
		}

		/**
		 * @function stepping
		 */
		self_.stepping = function() {
			return new promise(function(event) {
				si.cpu(function(data) {
					event("data", data.stepping);
				});
			});
		}

		/**
		 * @function revision
		 */
		self_.revision = function() {
			return new promise(function(event) {
				si.cpu(function(data) {
					event("data", data.revision);
				});
			});
		}

		/**
		 * @module info/cpu/temp
		 */
		self_.temp = function() {
			var self__ = {};

			/**
			 * @function max
			 */
			self__.max = function() {
				return new promise(function(event) {
					si.cpuTemperature(function(data) {
						event("data", data.max);
					});
				});
			}

			/**
			 * @function main
			 */
			self__.main = function() {
				return new promise(function(event) {
					si.cpuTemperature(function(data) {
						event("data", data.main);
					});
				});
			}

			return self__;
		}

		return self_;
	}

	/**
	 * @module info/user
	 */
	self.user = function() {
		var self_ = {};
		var user = os.userInfo();

		/**
		 * @function username
		 */
		self_.username = function() {
			return user.username;
		}

		/**
		 * @function uid
		 */
		self_.uid = function() {
			return user.uid;
		}

		/**
		 * @function gid
		 */
		self_.gid = function() {
			return user.gid;
		}

		/**
		 * @function shell
		 */
		self_.shell = function() {
			return user.shell;
		}

		return self_;
	}

	/**
	 * @function arguments
	 */
	self.arguments = function() {
		return process.argv;
	}

	/**
	 * @function root
	 */
	self.root = function() {
		return process.execPath;
	}

	/**
	 * @module info/ids
	 */
	self.ids = function() {
		var self_ = {};

		/**
		 * @function egid
		 */
		self_.egid = function() {
			return process.getegid();
		}

		/**
		 * @function euid
		 */
		self_.euid = function() {
			return process.geteuid();
		}

		/**
		 * @function gid
		 */
		self_.gid = function() {
			return process.getgid();
		}

		/**
		 * @function uid
		 */
		self_.uid = function() {
			return process.getuid();
		}

		/**
		 * @function pid
		 */
		self_.pid = function() {
			return process.pid;
		}

		return self_;
	}

	/**
	 * @module info/jnode
	 */
	self.jnode = function() {
		var self_ = {};
		var pson = require("../package.json");

		/**
		 * @function name
		 */
		self_.name = function() {
			return pson.name;
		}

		/**
		 * @function version
		 */
		self_.version = function() {
			return pson.version;
		}

		/**
		 * @function description
		 */
		self_.description = function() {
			return pson.description;
		}

		/**
		 * @function author
		 */
		self_.author = function() {
			return pson.author;
		}

		/**
		 * @function dependencies
		 */
		self_.dependencies = function() {
			return pson.dependencies;
		}

		/**
		 * @function license
		 */
		self_.license = function() {
			return pson.license;
		}

		return self_;
	}

	return self;
}