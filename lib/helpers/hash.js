/**
 * @module hash
 */
module.exports = function(jnode) {
	var self = {};

	var crypto = require("crypto");
	var node_rsa = require("node-rsa");

	/**
	 * @function hash
	 */
	self.hash = function(data, algorithm) {
		data = jnode.utils().check("string", data, "data");
		algorithm = algorithm || "sha256";

		return crypto.createHash(algorithm).update(data).digest('hex');
	}

	/**
	 * @function encrypt
	 */
	self.encrypt = function(data, key, algorithm) {
		data = jnode.utils().check("string", data, "data");
		key = jnode.utils().check("string", key, "key");
		algorithm = algorithm || "sha256";

		var cipher = crypto.createCipher(algorithm, key);
		return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
	}

	/**
	 * @function decrypt
	 */
	self.decrypt = function(data, key, algorithm) {
		data = jnode.utils().check("string", data, "data");
		key = jnode.utils().check("string", key, "key");
		algorithm = algorithm || "sha256";

		var cipher = crypto.createDecipher(algorithm, key);
		return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
	}

	/**
	 * @module hash/p2p
	 */
	self.p2p = function() {
		var self_ = {};

		var server_public = null;
		var server_private = null;
		var client_public = null;
		var generated = false;

		/**
		 * @function encrypt
		 */
		self_.encrypt = function() {
			return crypto.publicEncrypt({
				key: self.client_public,
				padding: crypto.constants.RSA_PKCS1_PADDING
			}, Buffer.from(data)).toString('base64');
		}

		/**
		 * @function decrypt
		 */
		self_.decrypt = function() {
			return crypto.privateDecrypt({
				key: private_key,
				padding: crypto.constants.RSA_PKCS1_PADDING
			}, Buffer.from(data, "base64")).toString("utf8");
		}

		/**
		 * @module hash/p2p/keys
		 */
		self_.keys = function() {
			var self__ = {};

			/**
			 * @function generate
			 */
			self__.generate = function(options) {
				if(options == null) {
					options = {};
				}

				var private_size = options["private_size"] || 65537;
				var public_size = options["public_size"] || 2048;
				var encryption_format = options["encryption_format"] || "pkcs1";

				return jnode.promise(function(event) {
					if(generated) {
						event("success");
						return;
					}

					generated = true;

					var key = new NodeRSA();
					key.generateKeyPair(public_size, private_size);
					server_private = key.exportKey(encryption_format + '-private-pem');
					server_public = key.exportKey(encryption_format + '-public-pem');
					event("success");
				});
			}

			/**
			 * @function client
			 */
			self__.client = function(key) {
				if(key != null) {
					client_public = key;
				}

				return client_public;
			}

			/**
			 * @function private
			 */
			self__.private = function(key) {
				if(key != null) {
					server_private = key;
				}

				return server_private;
			}

			/**
			 * @function public
			 */
			self__.public = function(key) {
				if(key != null) {
					server_public = key;
				}

				return server_public;
			}
		}

		return self_;
	}

	return self;
}