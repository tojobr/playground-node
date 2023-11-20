module.exports = function(file) {
	console.log('=== read module ====');

	const fs = require('fs');
	let content;
	fs.readFile(file, (err, data) => {
		if (err) {
			console.error(err);
			return null;
		}

		content = data ? data.toString() : '';
		console.log({file, content});
		return content;
	});
};