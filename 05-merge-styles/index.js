const path = require('path');
const fs = require('fs');


fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    (err) => {
        if (err) throw err;
    }
);

fs.promises.readdir(path.join(__dirname,"styles"))
    .then(files => {
for (let filename of files) {
    
   if (path.parse(filename).ext.substring(1)==="css"){
        const input = fs.createReadStream(path.join(__dirname, 'styles', filename), 'utf-8');

        input.on('data', chunk => {
            fs.appendFile(
                    path.join(__dirname, 'project-dist', 'bundle.css'),
                    chunk,
                    err => {
                        if (err) throw err;
                    }
                );
        });

        input.on('error', error => console.log('Error', error.message));

   }
}})
    .catch(err => {
        console.log(err)
    })

