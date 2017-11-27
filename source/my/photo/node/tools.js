const fs = require("fs");
const images = require("images");
const qiniu = require('qiniu');
const imgType =  ["gif", "jpeg", "jpg", "png"];//只能处理这几种文件类型
//https://github.com/zhangyuanwei/node-images

module.exports = {
    bjTime : function (dateString) { //把时间转为北京时间
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
    },
    fileType : function(filename) {//判断文件类型必须为图片
        var type = true;
        if (!RegExp("\.(" + imgType.join("|") + ")$", "i").test(filename.toLowerCase())) {
            // console.log("选择文件错误,图片类型必须是" + imgType.join("，") + "中的一种");
            console.log('非图片文件~');
            type = false;
        }
        return type;
    },
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
    resizeImg : function(filePath,fileName,outPath,outName,opt) {
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
    },
    mkdirFilePath : function(path) {//创建目录
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }
}