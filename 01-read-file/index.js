const fs = require('fs');
const input = fs.createReadStream('01-read-file/text.txt', 'utf-8');

const { stdout } = process;


input.on('data', chunk => stdout.write(chunk));
input.on('error', error => console.log('Error', error.message));
