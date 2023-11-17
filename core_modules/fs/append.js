module.exports = function(file) {
	console.log('=== append module ====');

	const fs = require('fs');

	// node main.js test
	console.log(process.argv);
	const newText = process.argv[2];
	if (newText && newText.trim().length) {
		console.log('append to current file');
		fs.appendFile(file, `${newText}\n`, (err) => {
			if (err) {
				console.error(err);
			} else {
				const read = require('./read');
				read(file);
			}
		});
	}	
};