/**
 * @module dns
 */
module.exports = function(jnode) {
	var self = {};

	var dns = require("dns");

	/**
	 * @function resolve
	 */
	self.resolve = function(hostname, type) {
		return jnode.promise(function(event) {
			hostname = jnode.utils().check("string", hostname, "hostname");
			type = type || "A";

			dns.resolve(hostname, type_, function(err, res) {
				if(err) {
					event("error", err);
					return;
				}

				event("success", res);
			});
		});
	}

	/**
	 * @function lookup
	 */
	self.lookup = function(hostname, options) {
		return jnode.promise(function(event) {
			hostname = jnode.utils().check("string", hostname, "hostname");
			options = options || {};

			dns.lookup(hostname, options, function(err, address, family) {
				if(err) {
					event("error", err);
					return;
				}

				event("success", {"address": address, "family": family});
			});
		});
	}

	/**
	 * @function reverse
	 */
	self.reverse = function(ip) {
		return jnode.promise(function(event) {
			ip = jnode.utils().check("string", ip, "ip");

			dns.reverse(ip, function(err, res) {
				if(err) {
					event("error", err);
					return;
				}

				event("success", res);
			});
		});
	}

	/**
	 * @function servers
	 */
	self.servers = function() {
		return jnode.getServers();
	}

	return self;
}