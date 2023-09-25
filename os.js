const { dir,log } = require('console');
const os = require('node:os');

// log(os.cpus())
log(os.platform())
log(os.type())
log(os.release())
log(os.version())