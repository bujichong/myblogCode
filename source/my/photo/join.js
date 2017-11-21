"use strict";
/*
此脚本用来合并filePath目录中的所有json文件到指定文件outFile中
2017-11-21
bujichong
 */
const fs = require("fs");

const opt = {
    filePath : 'json',
    outFile : 'join.json'
}

// var file="json/2017-11-20.json";
// var result=JSON.parse(fs.readFileSync( file));
// console.log(result);

//把时间转为北京时间
function bjTime (dateString) {
    let d = new Date(dateString);
    let ts = d.getTime();
    let bjD = new Date(ts);
    let date =  bjD.getDate();
    let month =  bjD.getMonth()+1;
    month = month*1<10?('0'+month):month;
    date = date*1<10?('0'+date):date;
    let time = bjD.getFullYear() + '-' +month +'-'+ date +' '+bjD.getHours()+':'+bjD.getMinutes()+':'+bjD.getSeconds();
    return { time :time , timeString:ts };
}


fs.readdir(opt.filePath, function (err, files) {
    if (err) {
        return;
    }
    let arr = [];

    // console.log(files);
    (function iterator(index) {

        if (index == files.length) {
            fs.writeFile(opt.outFile,JSON.stringify(arr, null, "\t"));
            console.log('处理完毕,#^_^#');
            return;
        }

        console.log('合并中...,第'+(index+1)+'/'+files.length+'个，名称：'+files[index]);
        let file = opt.filePath + "/" + files[index];
        fs.stat(file, function (err, stats) {
            if (err) {
                console.log(err);
                return;
            }
            let cTime = bjTime(stats.birthtime);//转化时间
            let fileData =  JSON.parse(file);

            arr.push({
                name : files[index].split('.')[0],
                time:cTime.time,
                timeString:cTime.timeString,
                data : fileData.data,
                info : fileData.info?fileData.info:''
            });
            iterator(index + 1);
        })

    }(0));
});