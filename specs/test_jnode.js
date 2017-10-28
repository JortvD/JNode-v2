var jnode = require("../index")();
jnode.settings().root(jnode.settings().root() + "specs");

// TEST //
jnode.start()
.then(jnode.stop);
