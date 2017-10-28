var jnode = require("../index")();
jnode.settings().root(jnode.settings().root() + "specs");

// TEST //
var uuid = jnode.uuid();
var uuid1 = uuid.generate();
jnode.logger().info("UUIDs 1: " + uuid.uuids());
var uuid2 = uuid.generate();
jnode.logger().info("UUIDs 2: " + uuid.uuids());
jnode.logger().info("Check: " + uuid.check(uuid1));
jnode.logger().info("Test: " + uuid.test(uuid1));
uuid.remove(uuid1);
jnode.logger().info("UUIDs 3: " + uuid.uuids());
uuid.add(uuid1);
jnode.logger().info("UUIDs 4: " + uuid.uuids());
uuid.clear();
jnode.logger().info("UUIDs 5: " + uuid.uuids());