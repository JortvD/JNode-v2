/**
 * @module sessions
 */
module.exports = function(jnode) {
	var self = {};

	var sessions = {};
	var uuids = jnode.uuid();

	self.get = function(response, request) {
		var key = request.cookie(jnode.settings().sessions().cookie().name());

		if(key == null) {
			key = uuids.generate();
		}
		else if(!uuids.check(key)) {
			key = uuids.generate();
		}

		var session = sessions[key];

		if(session == null) {
			session = {};
			session.data = {};
		}

		session.date = Date.now();
		sessions[key] = session;

		response.cookies().set(
			jnode.settings().sessions().cookie().name(),
			key,
			{
				age: jnode.settings().sessions().cookie().age(),
				path: jnode.settings().sessions().cookie().path(),
				same: jnode.settings().sessions().cookie().same(),
				secure: jnode.settings().sessions().cookie().secure(),
				http: jnode.settings().sessions().cookie().http()
			});

		self.update();

		return sessions[key].data;
	}

	self.update = function() {
		var now = Date.now();

		for(var key in sessions) {
			if((now - sessions.date) > 2635200000) {
				delete sessions[key];
			}
		}
	}
	
	return self;
}