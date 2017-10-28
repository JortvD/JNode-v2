/**
 * @module image
 */
module.exports = function(jnode, path) {
	var self = {};
	var img = null;
	var jimp = require("jimp");

	self.data = function() {
		return img.bitmap.data;
	}

	self.image = function() {
		return img;
	}

	self.load = function() {
		return jnode.promise(function(event) {
			jimp.read(path, function(err, img_) {
				if(err) {
					event("error");
					return;
				}

				img = _img;
				event("success");
			});
		});
	}

	self.clone = function() {
		return img.clone();
	}

	self.quality = function(percent) {
		img.quality(percent);
	}

	self.rgba = function(rgba) {
		img.rgba(rgba);
	}

	self.filter = function(filter) {
		img.filterType(filter);
	}

	self.save = function() {
		return jnode.promise(function(event) {
			img.write(path, function() {
				event("success");
			});
		});
	}

	self.hash = function() {
		return img.hash();
	}

	self.difference = function(image) {
		return jimp.distance(img, image.image());
	}

	self.stats = function() {
		var self_ = {};

		self_.width = function() {
			return img.bitmap.width;
		}

		self_.height = function() {
			return img.bitmap.height;
		}

		return self_;
	}

	self.deflate = function() {
		var self_ = {};

		self_.level = function(level) {
			img.deflateLevel(level);
		}

		self_.strategy = function(level) {
			img.deflateStrategy(level);
		}

		return self_;
	}

	self.resize = function() {
		var self_ = {};

		self_.resize = function(width, height, mode) {
			width = width || jimp.AUTO;
			height = height || jimp.AUTO;

			if(width == -1) {
				width = jimp.AUTO;
			}

			if(height == -1) {
				height = jimp.AUTO;
			}

			img.resize(width, height, mode);
		}

		self_.scale = function(factor, mode) {
			factor = factor || 1;

			img.scale(factor, mode);
		}

		return self_;
	}

	self.crop = function() {
		var self_ = {};

		self_.crop = function(x, y, height, width) {
			img.crop(x, y, height, width);
		}

		self_.autocrop = function() {
			img.autocrop();
		}

		return self_;
	}

	self.compose = function() {
		var self_ = {};

		self_.blit = function(image, x, y) {
			img.blit(image.image(), x, y);
		}

		self_.composite = function(image, x, y) {
			img.composite(image.image(), x, y);
		}

		self_.mask = function(image, x, y) {
			img.mask(image.image(), x, y);
		}

		return self_;
	}

	self.location = function() {
		var self_ = {};

		self_.mirror = self_.flip = function(type) {
			switch(type) {
				case "vertical":
					img.flip(false, true);
					return;
				default:
					img.flip(true, false);
					return;
			}
		}

		self_.rotate = function(degree) {
			img.rotate(degree);
		}

		return self_;
	}

	self.color = function() {
		var self_ = {};

		self_.contrast = function(amount) {
			img.contrast(amount);
		}

		self_.invert = function() {
			img.invert();
		}

		self_.normalize = function() {
			img.normalize();
		}

		self_.lighten = function(amount) {
			img.color([{apply: "lighten", params: [amount]}]);
		}

		self_.darken = function(amount) {
			img.color([{apply: "darken", params: [amount]}]);
		}

		self_.brighten = function(amount) {
			img.color([{apply: "brighten", params: [amount]}]);
		}

		self_.desaturate = function(amount) {
			img.color([{apply: "desaturate", params: [amount]}]);
		}

		self_.saturate = function(amount) {
			img.color([{apply: "saturate", params: [amount]}]);
		}

		self_.greyscale = function(amount) {
			img.color([{apply: "greyscale", params: [amount]}]);
		}

		self_.hue = self_.spin = function(amount) {
			img.color([{apply: "spin", params: [amount]}]);
		}

		self_.mix = function(color, amount) {
			img.color([{apply: "mix", params: [color, amount]}]);
		}

		self_.tint = function(amount) {
			img.color([{apply: "tint", params: [amount]}]);
		}

		self_.shade = function(amount) {
			img.color([{apply: "shade", params: [amount]}]);
		}

		self_.xor = function(amount) {
			img.color([{apply: "xor", params: [amount]}]);
		}

		self_.red = function(amount) {
			img.color([{apply: "red", params: [amount]}]);
		}

		self_.green = function(amount) {
			img.color([{apply: "green", params: [amount]}]);
		}

		self_.blue = function(amount) {
			img.color([{apply: "blue", params: [amount]}]);
		}

		return self_;
	}

	self.alpha = function() {
		var self_ = {};

		self_.fade = function(factor) {
			img.fade(factor);
		}

		self_.opacity = function(factor) {
			img.opacity(factor);
		}

		self_.opaque = function() {
			img.opaque();
		}

		return self_;
	}

	self.blur = function() {
		var self_ = {};

		self_.blur = function(amount) {
			img.blur(amount);
		}

		self_.gaussian = function(amount) {
			img.gaussian(amount);
		}

		return self_;
	}

	self.effects = function() {
		var self_ = {};

		self_.posterize = function(level) {
			img.posterize(level);
		}

		self_.sepia = function() {
			img.sepia();
		}

		self_.pixelate = function(size) {
			img.pixelate(size);
		}

		return self_;
	}

	return self;
}