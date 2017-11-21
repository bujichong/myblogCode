"use strict";
/*
此脚本用来处理图片，图片做两种输出 gallery和thumb，
处理完毕后写入json/nowDate.json中
2017-11-21
bujichong
 */
const fs = require("fs");
const images = require("images");
const imgType =  ["gif", "jpeg", "jpg", "png"];//只能处理这几种文件类型

const filePath = "../../../photos/";
const outPath = "../../../photos/out/";

const numberNaming = true;//是否采用数字序列重命名
const childPath = 'tom';//是否有子目录
const justJson = false;//只获取json,不处理图片

const sourcePath = filePath + childPath + "/";
const galleryPath = outPath + "gallery/" + childPath;
const thumbPath = outPath  + "thumb/"+ childPath;


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

/*图片处理等比宽高，并存储
type : 'auto'||'w'||'h' (宽高自动 || 限宽 || 限高)
name : 图片名称
path : 图片存放路径
maxsize : 限制的最大尺寸
quality : 图片质量 0-100
 */
function resizeImg (type,fileName,outName,path,maxsize,quality) {
    const img = images(sourcePath + "/" + fileName)//加载图像文件
    const size = img.size();
    const wh = size.width/size.height;
    let newsize = size;

    if(wh>=1&&type=='auto'||type=='w'){//'auto'&&图片宽>高 || 只限制宽
        if (maxsize<size.width) {
            (!justJson)&&img.resize(maxsize)//等比缩放图像到maxsize像素宽
            newsize = {width:maxsize,height:Math.floor(maxsize/wh)};
        };
    }
    if(wh<1&&type=='auto'||type=='h'){//'auto'&&图片宽<高 || 只限制高
        if(maxsize<size.height){
            (!justJson)&&img.resize(null,maxsize)//等比缩放图像到maxsize像素高
            newsize = {width:Math.floor(maxsize*wh),height:maxsize};
        }
    }
    if (!justJson) {//如果不只是输出json
        img.save(path + "/" + outName, {
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

//创建图片输出目录
mkdirFilePath(galleryPath);
mkdirFilePath(thumbPath);

let outfile = "json/"+childPath+'.json';//json输出地址及名称


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
        data : [],
        time : nowTime.time,
        timeString : nowTime.timeString
    };

    (function iterator(index) {

        if (index == files.length) {
            fs.writeFile(outfile, JSON.stringify(outJson, null, "\t"));
            console.log('处理完毕,#^_^#');
            return;
        }


        let fileName = files[index].toLowerCase();
        let outName = fileName;//输出名称
        let ex = /\.[^\.]+$/.exec(fileName);//文件后缀名
        if (numberNaming) {
            outName = index+ex; //输出为数字+后缀名
        };

        if (fileType(fileName)) {//文件为图片

            console.log('玩命处理中...,第'+(index+1)+'/'+files.length+'个，文件名称：'+fileName+'，输出名称：'+outName);

            fs.stat(sourcePath + "/" + fileName, function (err, stats) {
                if (err) {
                    console.error(err);
                    return;
                }
                // console.log(stats);

                let tb = resizeImg('w',fileName,outName,thumbPath,300,90);//处理图片最宽为300,品质为90%
                let sz = resizeImg('auto',fileName,outName,galleryPath,1500,80);//处理图片宽高最大为1500,品质为90%

                if (stats.isFile()) {
                    let cTime = bjTime(stats.mtime);
                    outJson.data.push({
                        name:childPath+'/'+outName,
                        // ow:sz.size.width,
                        // oh:sz.size.height,
                        tw : tb.width , th : tb.height,
                        w : sz.width , h : sz.height,
                        // time:stats.mtime,
                        time:cTime.time,
                        timeString:cTime.timeString
                    });
                }
                 iterator(index + 1);

            });
        }else if( ex=='.txt'){
          fs.readFile(sourcePath + "/" + fileName, {flag: 'r+', encoding: 'utf8'}, function (err, data) {
            if(err) {
                console.error(err);
                return;
            }
            console.log('玩命处理中...,第'+(index+1)+'/'+files.length+'个，文件名称：'+fileName+'，内容：'+data);
            outJson.title = fileName.replace(/.txt$/,'');//写入title字段中
            outJson.info = data;//写入info字段中

             iterator(index + 1);
          });
        };


    }(0));
});