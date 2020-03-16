let bunyan = require('bunyan');

let moduleMap = {};

/**
 *
 * @param name String
 * @returns {Logger}
 */
const Logger = (name) => {
    if (!name) throw new Error("Logger name is required");
    if (name in moduleMap) {
        return moduleMap[name]
    } else {
        let logger = bunyan.createLogger({
            name: name,
            streams: [
                {
                    stream: process.stdout,
                    level: 'debug'
                },
                {
                    type: 'rotating-file',
                    path: '/var/log/zippr/' + name + ".log",
                    period: '1d',   // daily rotation
                    count: 3        // keep 3 back copies
                }
            ]
        });
        moduleMap[name] = logger;
        return logger;
    }
};

module.exports = Logger;