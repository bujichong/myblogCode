"use strict";
/*
此脚本用来处理图片，图片做两种输出 gallery和thumb，
处理完毕后写入json/nowDate.json中
2017-11-21
bujichong
 */

var args  = process.argv.splice(2);
console.log(args[0]);

const fs = require("fs");
const images = require("images");
const opt = require("./config");
const imgType =  ["gif", "jpeg", "jpg", "png"];//只能处理这几种文件类型
// const numberNaming = true;//是否采用数字序列重命名
// const childPath = 'tom';//是否有子目录
// const justJson = false;//只获取json,不处理图片


//把时间转为北京时间
function bjTime (dateString) {
    let d = dateString?(new Date(dateString)):(new Date());
    let ts = d.getTime();
    // let ts = d.getTime() - d.getTimezoneOffset() * 60 * 1000;
    let bjD = new Date(ts);
    let date =  bjD.getDate();
    let month =  bjD.getMonth()+1;
    month = month*1<10?('0'+month):month;
    date = date*1<10?('0'+date):date;
    let time = bjD.getFullYear() + '-' +month +'-'+ date +' '+bjD.getHours()+':'+bjD.getMinutes()+':'+bjD.getSeconds();
    return { time :time , timeString:ts };
}

//判断文件类型必须为图片
function fileType (filename) {
    var type = true;
    if (!RegExp("\.(" + imgType.join("|") + ")$", "i").test(filename.toLowerCase())) {
        // console.log("选择文件错误,图片类型必须是" + imgType.join("，") + "中的一种");
        console.log('非图片文件~');
        type = false;
    }
    return type;
}

/*
图片处理等比宽高，并存储
filePath : 图片源地址
fileName ： 图片名称
outPath :  图片保存地址
outName : 图片保存名称
opt ={
    type : 'auto'||'w'||'h' (宽高自动 || 限宽 || 限高)
    maxsize : 限制的最大尺寸
    quality : 图片质量 0-100
}
 */
function resizeImg (filePath,fileName,outPath,outName,opt) {
    const type = opt.type;
    const maxsize = opt.maxsize;
    const quality = opt.quality;
    const img = images(filePath + "/" + fileName)//加载图像文件
    const size = img.size();
    const wh = size.width/size.height;
    let newsize = size;
//type,maxsize,quality
    if(wh>=1&&type=='auto'||type=='w'){//'auto'&&图片宽>高 || 只限制宽
        if (maxsize<size.width) {
            (!opt.justJson)&&img.resize(maxsize)//等比缩放图像到maxsize像素宽
            newsize = {width:maxsize,height:Math.floor(maxsize/wh)};
        };
    }
    if(wh<1&&type=='auto'||type=='h'){//'auto'&&图片宽<高 || 只限制高
        if(maxsize<size.height){
            (!opt.justJson)&&img.resize(null,maxsize)//等比缩放图像到maxsize像素高
            newsize = {width:Math.floor(maxsize*wh),height:maxsize};
        }
    }
    if (!opt.justJson) {//如果不只是输出json
        img.save(outPath + "/" + outName, {
            quality : quality  //保存图片到文件,图片质量为60
        });
    };
    return newsize;
}

//创建目录
function mkdirFilePath (path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}


if (args[0]===undefined||args[0]=='run') {//处理图片

    opt.files.forEach(function(item){
        let filename = item.name;
        let sourcePath = opt.filePath + filename + "/";

        let galleryParPath = opt.fileOutPath + opt.gallery.pathName+'/';
        let thumbParPath = opt.fileOutPath  + opt.thumb.pathName +'/';

        //创建图片输出父级目录
        mkdirFilePath(galleryParPath);
        mkdirFilePath(thumbParPath);

        let galleryPath = galleryParPath + filename;
        let thumbPath = thumbParPath+ filename;

        //创建图片输出目录
        mkdirFilePath(galleryPath);
        mkdirFilePath(thumbPath);
        //json输出地址及名称
        let outfile = opt.jsonOutPath+filename+'.json';
        // console.log('=======进入目录：'+filename+"=======");
        //读取处理图片及说明文件
        //说明文件必须为readme.txt
        fs.readdir(sourcePath, function (err, files) {
            if (err) {
                return;
            }
            var nowTime = bjTime();
            // console.log(files);
            let outJson = {
                title : '',
                info : '',
                time : nowTime.time,
                // timeString : nowTime.timeString,
                data : []
            };

            (function iterator(index) {

                if (index == files.length) {
                    if(item.title){outJson.title = item.title};//json文件里的内容优先
                    if(item.info){outJson.info = item.info};
                    if(item.time){outJson.time = item.time};
                    fs.writeFile(outfile, JSON.stringify(outJson, null, "\t"));
                    console.log('处理完毕,#^_^#');
                    return;
                }


                let fileName = files[index].toLowerCase();
                let outName = fileName;//输出名称
                let ex = /\.[^\.]+$/.exec(fileName);//文件后缀名
                if (opt.numberNaming) {
                    outName = index+ex; //输出为数字+后缀名
                };

                if (fileType(fileName)) {//文件为图片

                    console.log('处理中...,第'+(index+1)+'/'+files.length+'个，文件：'+filename+'/'+fileName+'，输出名称：'+outName);

                    fs.stat(sourcePath + "/" + fileName, function (err, stats) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        // console.log(stats);

                        if (stats.isFile()) {

                            let cTime = bjTime(stats.mtime);
                            let temp = {
                                name:filename+'/'+outName,
                                // tw : tb.width , th : tb.height,
                                // w : sz.width , h : sz.height,
                                time:cTime.time
                                // timeString:cTime.timeString
                            }
                            if(opt.thumb.run){
                                let tb = resizeImg(sourcePath,fileName,thumbPath,outName,opt.thumb);//处理图片最宽为300,品质为90%
                                temp.tw = tb.width;
                                temp.th = tb.height;
                            }
                            if(opt.gallery.run){
                                let sz = resizeImg(sourcePath,fileName,galleryPath,outName,opt.gallery);//处理图片宽高最大为1500,品质为90%
                                temp.w = sz.width;
                                temp.h = sz.height;
                            }

                            outJson.data.push(temp);
                        }
                         iterator(index + 1);

                    });
                }else if( ex=='.txt'){
                  fs.readFile(sourcePath + "/" + fileName, {flag: 'r+', encoding: 'utf8'}, function (err, data) {
                    if(err) {
                        console.error(err);
                        return;
                    }
                    console.log('处理中...,第'+(index+1)+'/'+files.length+'个，文件：'+filename+'/'+fileName+'，内容：'+data);
                    outJson.title = fileName.replace(/.txt$/,'');//写入title字段中
                    outJson.info = data;//写入info字段中

                     iterator(index + 1);
                  });
                };


            }(0));
        });

    });

};


if (args[0]=='join'||args[0]=='-j') {

    // var file="json/2017-11-20.json";
    // var result=JSON.parse(fs.readFileSync( file));
    // console.log(result);
    fs.readdir(opt.jsonOutPath, function (err, files) {
        if (err) {
            return;
        }
        let arr = [] ,absArr = [],allArr = {data:[]};

        // console.log(files);
        (function iterator(index) {
            if (index == files.length) {
                fs.writeFile(opt.join.path+opt.join.outFile , JSON.stringify(arr, null, "\t"));//输出全量json文件
                fs.writeFile(opt.join.path+opt.join.outAbsFile , JSON.stringify(absArr, null, "\t"));//输出摘要json文件
                fs.writeFile(opt.join.path+opt.join.outAllFile , JSON.stringify(allArr, null, "\t"));//输出摘要json文件
                console.log('处理完毕,#^_^#');
                return;
            }

            console.log('合并中...,第'+(index+1)+'/'+files.length+'个，名称：'+files[index]);

            let thisFile = opt.jsonOutPath + files[index];
            fs.stat(thisFile, function (err, stats) {//读取验证文件类型
                if (err) {
                    console.error(err);
                    return;
                }
                if (stats.isFile()) {//如果是文件类型
                    let fileData =  JSON.parse(fs.readFileSync( thisFile));
                    fileData.name =  files[index].split('.')[0];
                    arr.push(fileData);
                    absArr.push({
                        title : fileData.title,
                        info : fileData.info,
                        name :  files[index],
                        time : fileData.time,
                        // timeString : fileData.timeString,
                        pic : fileData.data[0]
                    });
                    allArr.data.push.apply( allArr.data , fileData.data );
                }
                iterator(index + 1);//进入下一个
            });

        }(0));
    });


};