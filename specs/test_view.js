var jnode = require("../index")();
jnode.settings().root(jnode.settings().root() + "specs/");

// TEST //
jnode.view("/", "view2")
.then(function() {
	jnode.view("/test/", "view")
	.then(function() {
		jnode.start()
		.then(function() {
			jnode.request("http://localhost:8080/test/", function(error, response, body) {
				if(error) {
					jnode.logger().error(error);
				}
				else {
					jnode.logger().info("Requesting the url: " + response.request.method + " " + response.request.uri.href);
					jnode.logger().info("code: " + response.statusCode);
					jnode.logger().info("type: " + response.headers['content-type']);
					jnode.logger().info("body: " + body);
				}

				jnode.stop();
			});
		});
	});
});
