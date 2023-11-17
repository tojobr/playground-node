const fs = require('./fs');
const { logging, normalize } = require('./path');

const currentFile = 'text.txt'; 
fs.read(currentFile);
logging();

fs.append(currentFile);

console.log('===')
normalize('test1//2slashes/1slash/tab/');