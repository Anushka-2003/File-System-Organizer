#!/usr/bin/env node
const inputArr = process.argv.slice(2);
const fs = require('fs');
const path = require('path');
const helpObj = require("./commands/help");
const organizeObj = require("./commands/organize");
const treeObj = require("./commands/tree");

//console.log(inputArr);

// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help

let command = inputArr[0];
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar','tar','gz','ar', 'iso','xz'],
    documents: ['docx','doc', 'pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
    app:['exe','dmg','pkg','deb']
};

switch (command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpkey;
        break;
    default:
        console.log("Please🙏 Input valid command");
}

