"use strict";
/*
此脚本用来处理图片，图片做两种输出 gallery和thumb，
处理完毕后写入json/nowDate.json中
2017-11-21
bujichong
 */
var args  = process.argv.splice(2);
console.log(args[0], args[1]);

const fs = require("fs");
const images = require("images");
const opt = require("./config");
const {bjTime,fileType,resizeImg,mkdirFilePath} = require("./tools");
const {gallery,jsonJoin,uploadQiniu,delFromQiniu} = require("./gallery");


if (args[0]=='all'||args[0]=='-a') {//all 处理
    gallery(opt,function () {//先处理图片，在合并
        jsonJoin(opt,function () {
          uploadQiniu(opt,args[1]);
        });
    });
};

if (args[0]===undefined||args[0]=='run'||args[0]=='photo'||args[0]=='-p'||args[0]=='-r') {//处理图片
    gallery(opt);
};

if (args[0]=='join'||args[0]=='-j') {//合并json
    jsonJoin(opt);
};


if (args[0]=='upload'||args[0]=='up'||args[0]=='-u') {//合并json
    uploadQiniu(opt,args[1]);
};

if (args[0]=='del'||args[0]=='delete'||args[0]=='-d') {//合并json
    delFromQiniu(opt,args[1]);
};