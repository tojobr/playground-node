module.exports = function(file) {
	console.log('=== read module ====');

	const fs = require('fs');
	fs.readFile(file, (err, data) => {
		if (err) {
			console.error(err);
		}
		console.log(data.toString());
	});
};