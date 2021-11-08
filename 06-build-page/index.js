
const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'project-dist'),{ recursive: true }, err => {
    if (err) throw err;
});


// создание из компонентов index.html

fs.writeFile(
    path.join(__dirname, 'project-dist', 'index.html'),
    '',
    (err) => {
        if (err) throw err;
    }
);


const input = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');


input.on('data', chunk => {

    if (chunk.indexOf("{{header}}")!==-1){
        const input2 = fs.createReadStream(path.join(__dirname, "components", 'header.html'), 'utf-8');
        const input3 = fs.createReadStream(path.join(__dirname, "components", 'articles.html'), 'utf-8');
        const input4 = fs.createReadStream(path.join(__dirname, "components", 'footer.html'), 'utf-8');

        const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));

        input2.on('data', chunk2 => {
          newStr =  chunk.replace(/{{header}}/, chunk2)
          input3.on('data', chunk3 => {
        newStr =  newStr.replace(/{{articles}}/, chunk3)
            input4.on('data', chunk4 => {
            newStr =  newStr.replace(/{{footer}}/, chunk4);
             output.write(newStr);  
          }) })
           
        })
    }
})

input.on('error', error => console.log('Error', error.message));


//copy a folder


fs.mkdir(path.join(__dirname, 'project-dist','assets'),{ recursive: true }, err => {
    if (err) throw err;
});


fs.promises.readdir(path.join(__dirname,"assets"))
    .then(files => {
for (let filename of files) {
if (!path.parse(filename).ext){
    fs.mkdir(path.join(__dirname, 'project-dist','assets',filename),{ recursive: true }, err => {
        if (err) throw err;
    });

    fs.promises.readdir(path.join(__dirname,"assets",filename))
    .then(files2 => {
            for (let filename2 of files2) {
                function callback(err) {
                        if (err) throw err;
                    }
                    fs.copyFile(path.join(__dirname,"assets",filename,filename2), path.join(__dirname,'project-dist',"assets",filename,filename2), callback);
            }})
    .catch(err => {
        console.log(err)
    })
}}})
    .catch(err => {
        console.log(err)
    })

            //copy styles

fs.writeFile(
    path.join(__dirname, 'project-dist', 'style.css'),
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
                    path.join(__dirname, 'project-dist', 'style.css'),
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

