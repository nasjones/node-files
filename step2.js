const fs = require('fs');
const argv = process.argv;
const validUrl = require('valid-url')
const axios = require('axios')

if(validUrl.isUri(argv[2])){
    webCat(argv[2])
}else{
    cat(argv[2])
}

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

async function webCat(url){

    axios.get(url).then(res=>{
        console.log(res.data)
    }).catch(err=>{
        console.error(`Error fetching ${url}:`)
        console.error(err.message)
    })

}