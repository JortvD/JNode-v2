var jnode = require("../index")();
jnode.settings().root(jnode.settings().root() + "specs");

// TEST //
var utils = jnode.utils();

// .is()
jnode.logger().info(".is()");
jnode.logger().info(utils.is().string("Test"));
jnode.logger().info(utils.is().date(new Date()));
jnode.logger().info(utils.is().object({}));
jnode.logger().info(utils.is().number(1));
jnode.logger().info(utils.is().function(function() {}));
jnode.logger().info(utils.is().array(["test1"]));

// .type()
jnode.logger().info(".type()");
jnode.logger().info(utils.type("Test"));
jnode.logger().info(utils.type(new Date()));
jnode.logger().info(utils.type({}));
jnode.logger().info(utils.type(1));
jnode.logger().info(utils.type(function() {}));
jnode.logger().info(utils.type(["test1"]));

// .now()
jnode.logger().info(".now()");
jnode.logger().info(utils.now());

// .keys()
jnode.logger().info(".keys()");
jnode.logger().info(utils.keys({"test1":"", "test2":""}));

// .values()
jnode.logger().info(".values()");
jnode.logger().info(utils.values({"":"test1", "":"test2"}));

// .size()
jnode.logger().info(".size()");
jnode.logger().info(utils.size({"test1":"", "test2":""}));
jnode.logger().info(utils.size("test1 test2"));
jnode.logger().info(utils.size(["test1", "test2"]));

// .concat()
jnode.logger().info(".concat()");
jnode.logger().info(utils.concat(["test1"], "test2", ["test3", "test4"], "test5"));

// .insert()
jnode.logger().info(".insert()");
jnode.logger().info(utils.insert(["test1", "test3"], ["test2"], 1));

// .arrayify()
jnode.logger().info(".arrayify()");
jnode.logger().info(utils.arrayify("test1", "test2", "test3"));

// .chunk()
jnode.logger().info(".chunk()");
jnode.logger().info(utils.chunk(["test1", "test2", "test3"], 2));

// .stringify()
jnode.logger().info(".stringify()");
jnode.logger().info(utils.stringify("test"));
jnode.logger().info(utils.stringify(["test"]));
jnode.logger().info(utils.stringify(10101));
jnode.logger().info(utils.stringify({"test1": "test2", "test3": "test4"}));
jnode.logger().info(utils.stringify(new Date()));

// .slice()
jnode.logger().info(".slice()");
jnode.logger().info(utils.slice(["test1", "test2", "test3"], 1));

// .compact()
jnode.logger().info(".compact()");
jnode.logger().info(utils.compact(["test1", false, "test3"]));

// .after()
jnode.logger().info(".after()");
jnode.logger().info(utils.after(["test1", "test2", "test3"], 2));

// .before()
jnode.logger().info(".before()");
jnode.logger().info(utils.before(["test1", "test2", "test3"], 2));

// .unique()
jnode.logger().info(".unique()");
jnode.logger().info(utils.unique(["test1", "test2", "test1", "test3"]));

// .contains()
jnode.logger().info(".contains()");
jnode.logger().info(utils.contains(["test1", "test2", "test3"], "test2"));
jnode.logger().info(utils.contains("test1test2test3", "test2"));

// .drop()
jnode.logger().info(".drop()");
jnode.logger().info(utils.drop(["test1", "test2", "test3"], 1, 1));
jnode.logger().info(utils.drop("test1test2test3", 5, 10));

// .fill()
jnode.logger().info(".fill()");
jnode.logger().info(utils.fill(["test1", "test2", "test3"], ["test"]));
jnode.logger().info(utils.fill("test1test2test3", "x"));

// .capitalize()
jnode.logger().info(".capitalize()");
jnode.logger().info(utils.capitalize("capitalize"));

// .decapitalize()
jnode.logger().info(".decapitalize()");
jnode.logger().info(utils.decapitalize("decapitalize"));

// .repeat()
jnode.logger().info(".repeat()");
jnode.logger().info(utils.repeat("test", 5));
jnode.logger().info(utils.repeat(["test1", "test2"], 5));

// .add()
jnode.logger().info(".add()");
jnode.logger().info(utils.add(1, 2, 3, 4, 5));

// .remove()
jnode.logger().info(".remove()");
jnode.logger().info(utils.remove(1, 2, 3, 4, 5));

// .devide()
jnode.logger().info(".devide()");
jnode.logger().info(utils.devide(1, 2, 3, 4, 5));

// .multiply()
jnode.logger().info(".multiply()");
jnode.logger().info(utils.multiply(1, 2, 3, 4, 5));

// .max()
jnode.logger().info(".max()");
jnode.logger().info(utils.max([1, 5, 2, 4, 3]));

// .min()
jnode.logger().info(".min()");
jnode.logger().info(utils.min([5, 1, 4, 2, 3]));

// .assign()
jnode.logger().info(".assign()");
jnode.logger().info(utils.assign({"test1": "test2"}, {"test3": "test4"}));

// .reverse()
jnode.logger().info(".reverse()");
jnode.logger().info(utils.reverse(["test1", "test2", "test3"]));

// .starts()
jnode.logger().info(".starts()");
jnode.logger().info(utils.starts("test1test2test3", "test1"));

// .ends()
jnode.logger().info(".ends()");
jnode.logger().info(utils.ends("test1test2test3", "test3"));

// .split()
jnode.logger().info(".split()");
jnode.logger().info(utils.split("test1,test2,test3"));

// .trim()
jnode.logger().info(".trim()");
jnode.logger().info(utils.split("   test   "));

// .padding()
jnode.logger().info(".padding()");
jnode.logger().info(utils.padding("test", 3));

// .bytes()
jnode.logger().info(".bytes()");
jnode.logger().info(utils.bytes(333));
jnode.logger().info(utils.bytes(333333));
jnode.logger().info(utils.bytes(333333333));
jnode.logger().info(utils.bytes(333333333333));
jnode.logger().info(utils.bytes(333333333333333));
jnode.logger().info(utils.bytes(333333333333333333));