
const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'files-copy'),{ recursive: true }, err => {
    if (err) throw err;
});


fs.promises.readdir(path.join(__dirname,"files"))
    .then(files => {
for (let filename of files) {
    function callback(err) {
        if (err) throw err;
      }
      // destination.txt will be created or overwritten by default.
      fs.copyFile(path.join(__dirname,'files',filename), path.join(__dirname,'files-copy',filename), callback);
      }
})
    .catch(err => {
        console.log(err)
    })
