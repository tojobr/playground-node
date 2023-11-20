const fs = require('./fs');
const { logging, normalize } = require('./path');

function testReadAndWrite() {
	logging();

	// read
	const currentFile = 'text.txt'; 
	fs.read(currentFile);
	
	// write
	fs.append(currentFile);
	
	console.log('===')
	// normalize path
	normalize('test1//2slashes/1slash/tab/');
}

function main() {
	// console.log('===')
	// testReadAndWrite();

	console.log('===')
	fs.calculateFiles('/tmp/folder')
		.then(res => {
			console.log({res});
		})
		.catch(console.error);
}

main();
