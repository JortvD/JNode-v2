var jnode = require("../index")();
jnode.settings().root(jnode.settings().root() + "specs");

// TEST //
var event = jnode.event();
event.on("event1").then(function() {
	jnode.logger().info("The 'event1' was emitted!");
});
event.clear("event1");
event.on("event1").then(function() {
	jnode.logger().info("The 'event1' was emitted!");
});
event.on("event2").then(function() {
	jnode.logger().info("The 'event2' was emitted!");
});
event.block("event1");
event.emit("event1");
event.emit("event2");
event.unblock("event1");
event.emit("event1");