
const path = require('path');
const fs = require('fs')

fs.promises.readdir(path.join(__dirname,"secret-folder"))
    .then(filenames => {
for (let filename of filenames) {
    fs.stat(path.join(__dirname,"secret-folder",filename), (err, stats) => {
        if (stats.isFile()){
            let doct = path.parse(filename);
            let kB = (stats.size * 0.0009765625).toFixed(3);
           console.log(`${doct.name}     -    ${doct.ext.substring(1)}    -   ${kB}kb`);  
        }  
        });
      }

})
    .catch(err => {
        console.log(err)
    })