var jnode = require("../index")();
jnode.settings().root(jnode.settings().root() + "specs");

// TEST //
jnode.router().route("/test/")
.on("request", function(req, res) {
	res.send("TEST");
});

jnode.start()
.then(function() {
	jnode.request("http://localhost:8080/test/", function(error, response, body) {
		if(error) {
			jnode.logger().error(error);
		}
		else {
			jnode.logger().info("Requesting the url: " + response.method + " " + response.url);
			jnode.logger().info("code: " + response.statusCode);
			jnode.logger().info("type: " + response.headers['content-type']);
			jnode.logger().info("body: " + body);
		}

		jnode.stop();
	});
});