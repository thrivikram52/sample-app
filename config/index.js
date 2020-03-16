var fs = require('fs');
var path = require('path');
var app = function () {
	switch (process.env.NODE_ENV) {
		case 'default':
			return JSON.parse(fs.readFileSync(path.resolve(__dirname,'default.json')));
			break;
		case 'dev':
			return JSON.parse(fs.readFileSync(path.resolve(__dirname,'dev.json')));
			break;
		case 'production':
			return JSON.parse(fs.readFileSync(path.resolve(__dirname,'prod.json')));
			break;
		default:
			throw new Error("Config variables not set");
	}
};

module.exports = app();