const fs = require('fs');
const output = fs.createWriteStream('02-write-file/text.txt');
const { stdin,stdout } = process;
const path = require('path');


fs.writeFile(
    path.join(__dirname, 'text.txt'),
    '',
    (err) => {
        if (err) throw err;
    }
);

stdout.write("Please, write any text to be inserted into 'text.txt'\n");

stdin.on("data", data=>{
    const dataStringified = data.toString();
    output.write(dataStringified);
    if (dataStringified.substring(0,dataStringified.length-2) === "exit"){
        stdout.write("Good luck!\n");
        process.exit();
    }
});

process.on('SIGINT', () => {
    stdout.write("Good luck!\n");
    process.exit();
});
