var jnode = require("../index")();
jnode.settings().root(jnode.settings().root() + "specs");

// TEST //
var db = jnode.database();
var table = db.database("new").table("test_table");
table.columns().add("test1");
table.columns().add("test2");
table.columns().add("test3");
table.insert({"test1": "A", "test2": "Wonderful", "test3": "Table"})
.then(function() {
	table.find({})
	.then(function(docs) {
		console.log(docs);
		table.modify({"test3": "Table"}, {"test3": "Document"})
		.then(function() {
			table.find({})
			.then(function(docs) {
				console.log(docs);
				table.clear()
				.then(function() {
					table.find({})
					.then(function(docs) {
						console.log(docs);
						table.close();
					})
					.catch(console.log);
				})
				.catch(console.log);
			})
			.catch(console.log);
		})
		.catch(console.log);
	})
	.catch(console.log);
})
.catch(console.log);