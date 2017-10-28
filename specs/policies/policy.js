module.exports = {
	test: function(req, res, jnode) {
		res.errors().badrequest("This error was send by a policy!");
	}
}