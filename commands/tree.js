const fs = require('fs');
const path = require('path');

function treeFn(dirpath){
    //console.log(" Code goes here" , dirpath);
    // 1. input -> directory Path given 
    //let destPath;
    if(dirpath == undefined){
        //console.log("Kindly enter a path");
        // for making it global
        treeHelper(process.cwd(), "");                             // cwd = current working directory , jaha pe bhi run hoga vaha ka path apne aap pick kr lega
        return;
    }
    else{
        let doesPathExist = fs.existsSync(dirpath);
        if(doesPathExist){

            treeHelper(dirpath, "");
            
        }
        else{
            console.log("Kindly enter a path");
            return;
        }
    }
}

function treeHelper(dirpath, indent) {

// 1. Check whether its a file or a folder

let isFile = fs.lstatSync(dirpath).isFile();
if(isFile == true){
    let fileName = path.basename(dirpath);
    console.log(indent, "├──", fileName );
}else{
    let dirName = path.basename(dirpath);
    console.log(indent, "└──" , dirName);
    let children = fs.readdirSync(dirpath);
    for(let i = 0; i < children.length; i++){
        let childPath = path.join(dirpath, children[i]);
        treeHelper(childPath, indent + "\t");
    }
}
}

module.exports = {
        treeKey : treeFn
}