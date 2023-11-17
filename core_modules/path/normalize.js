module.exports = function(filePath) {
	const path = require('path');

	// Normalize a path
	const newPath = path.normalize(filePath); 
	console.log(filePath + ' => ' + newPath);
	return newPath;
}