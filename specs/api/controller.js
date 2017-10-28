module.exports = {
	test: function(req, res, jnode) {
		res.json()["test"] = "This came from a API controller!";
		res.emit();
	},

	json: function(req, res, jnode) {
		res.json()["test"] = "This worked!";
		console.log("JSON: " + jnode.utils().stringify(res.json()));
		res.code(400);
		console.log("Code: " + res.code());
		res.emit();
		console.log("Emitted: " + res.emitted());
	}
}