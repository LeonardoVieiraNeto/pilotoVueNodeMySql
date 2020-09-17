const args = process.argv;
const fs = require('fs');
const util = require('./Exceptions')

module.exports = {
	configFile: (callback, notOpenFile) => {
		if (args.length > 2) {

			let configIndex = 2;
			let config = {};

			if (args.length > 3) {
				configIndex = 3;
				config.door = args[2];
			}

			if (!notOpenFile) {
				config.file = JSON.parse(fs.readFileSync(args[configIndex], 'utf8'));
			} else {
				config.door = args[2];
			}
			callback(config);
		} else {
			console.log(util.configFileNotFound);
		}
	}
}