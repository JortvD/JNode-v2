var jnode = require("../index")();
jnode.settings().root(jnode.settings().root() + "specs");

// TEST //
var api = jnode.api();
api.add("test/").then(api.load("controller").json);

jnode.start()
.then(function() {
	jnode.request("http://localhost:8080/api/test/", function(error, response, body) {
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