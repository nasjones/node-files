const fs = require('fs');
const argv = process.argv;
cat(argv[2])


function cat(path){
    fs.readFile(path,'utf8',(err,data)=>{
        
        if (err){
           console.error(err)
           process.exit(1)
        }
        console.log(data)
        process.exit(0)
        
    })
}