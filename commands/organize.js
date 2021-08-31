
const fs = require('fs');
const path = require('path');
function organizeFn(dirpath){
    //console.log(" Code goes here" , dirpath);
    // 1. input -> directory Path given 
    let destPath;
    if(dirpath == undefined){
        //console.log("Kindly enter a path");
        destPath = process.cwd();
        return;
    }
    else{
        let doesPathExist = fs.existsSync(dirpath);
        if(doesPathExist){

            // 2. create -> organized files directory
            destPath = path.join(dirpath, "organized_files");
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }
            
        }
        else{
            console.log("Kindly enter a path");
            return;
        }
    }
    
    // 3. identify categories of all the files present in that input directory
    organizeHelper(dirpath, destPath);

}

function organizeHelper(src, dest){
    
    // 3. identify categories of all the files present in that input directory
    let childNames = fs.readdirSync(src);
    //console.log(childNames);
    
    for(let i = 0; i < childNames.length; i++){
        let childPath = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childPath).isFile();
        if(isFile){
            //console.log(childNames[i]);
            let category = getcategory(childNames[i]);
            console.log(childNames[i], "belongs to --> " + category);

            // 4. copy/cut files to that organized directory inside any category folder
            sendFiles(childPath, dest, category);
        }
    }


}

function getcategory(name){
    let extnam = path.extname(name);
    //console.log(extnam);
    extnam = extnam.slice(1);
    for(let type in types){
        let catArr = types[type];
        for(let i = 0; i < catArr.length; i++){
            if(catArr[i] == extnam){
                return type;
            }
        }
    }
    return "others";

}

function sendFiles(childAddress, destination, categ){
    let categoryPath = path.join(destination, categ);
    if( fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath)
    }

    let fileName = path.basename(childAddress);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(childAddress, destFilePath);
    fs.unlinkSync(childAddress);
    console.log(fileName, "Copied to" , categ );
}

module.exports = {
    organizeKey : organizeFn
}