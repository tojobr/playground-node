const fs = require('fs');
const path = require('path');

/**
 * it calculates the MD5 hash of each file in inputFolder
 * @param {string} inputFolder 
 * @returns {Promise<{[relativePath: string]: string}>} like { 'hello.txt': 'xxxxxxxx', 'nested-folder': 'xxxxxxxx' }
 */
async function calculateFiles(inputFolder, showAsNestedItems = false) {
	if (!inputFolder) return {};

	const filepath = getPath(inputFolder);
	if (!fs.existsSync(filepath)) {
		console.error(`${filepath} does not exist`);
		return {};
	};
	
	const stats = fs.lstatSync(filepath);
	if (stats.isFile()) {
		//---- is file ? -----//
		const data = fs.readFileSync(filepath);
		return toMd5String(data);
	} else if (stats.isDirectory()) {
		//---- is directory ? ----//
		let result = {};

		const items = await fs.readdirSync(filepath);
		for (const item of items) {
			result[item] = await calculateFiles(path.join(inputFolder, item));
		}
		
		if (!showAsNestedItems) {
			Object.keys(result).forEach(key => {
				const value = result[key];
				if (typeof value === 'object') {
					const nestedKeys = Object.keys(value);
					nestedKeys.forEach(nestedKey => {
						result[`${key}/${nestedKey}`] = value[nestedKey];
					});
					delete result[key];
				}
			});
		}
		
		return result;
	}
	return {};
}

/**
 * get file path
 * @param {string} filename
 * @returns {string}
 */
function getPath(filename) {
	const currentDir = process.cwd();
	
	if (!filename.startsWith(currentDir)) {
		return path.join(currentDir, filename);
	}
	return filename;
}

/**
 * it transforms data to md5 string
 * @param {*} data 
 * @returns {string}
 */
function toMd5String(data) {
	const crypto = require('crypto');
	return crypto.createHash('md5').update(data).digest('hex');
}

module.exports = function(inputFolder) {
	return calculateFiles(inputFolder);
}