"use strict";

const fs = require("fs");
const images = require("images");
const filePath = "../../../photos/";
const outPath = "../../../photos/out/";
const outfile = "gallery.json";
const sourcePath = filePath + "source";
const galleryPath = outPath + "gallery";
const thumbPath = outPath + "thumb";

fs.readdir(sourcePath, function (err, files) {
    if (err) {
        return;
    }
    // console.log(files);
    let arr = [];

    /*图片处理等比宽高，并存储
    type : 'auto'||'w'||'h' (宽高自动 || 限宽 || 限高)
    name : 图片名称
    path : 图片存放路径
    maxsize : 限制的最大尺寸
    quality : 图片质量 0-100
     */
    function resizeImg (type,name,path,maxsize,quality) {
        const img = images(sourcePath + "/" + name)//加载图像文件
        const size = img.size();
        const wh = size.width/size.height;
        let newsize = size;

        if(wh>=1&&type=='auto'||type=='w'){//'auto'&&图片宽>高 || 只限制宽
            if (maxsize<size.width) {
                img.resize(maxsize)//等比缩放图像到maxsize像素宽
                newsize = {width:maxsize,height:Math.floor(maxsize/wh)};
            };
        }
        if(wh<1&&type=='auto'||type=='h'){//'auto'&&图片宽<高 || 只限制高
            if(maxsize<size.height){
                img.resize(null,maxsize)//等比缩放图像到maxsize像素高
                newsize = {width:Math.floor(maxsize*wh),height:maxsize};
            }
        }

        img.save(path + "/" + name, {
            quality : quality  //保存图片到文件,图片质量为60
        });
        return newsize;
    }

    (function iterator(index) {

        if (index == files.length) {
            fs.writeFile(outfile, JSON.stringify(arr, null, "\t"));
            console.log('处理完毕,#^_^#');
            return;
        }

        console.log('玩命处理中...,第'+(index+1)+'/'+files.length+'张，名称：'+files[index]);

        fs.stat(sourcePath + "/" + files[index], function (err, stats) {
            if (err) {
                return;
            }

            let tb = resizeImg('w',files[index],thumbPath,300,90);
            let sz = resizeImg('auto',files[index],galleryPath,1500,80);

            if (stats.isFile()) {
                arr.push({
                    name:files[index],
                    // ow:sz.size.width,
                    // oh:sz.size.height,
                    tw : tb.width , th : tb.height,
                    w : sz.width , h : sz.height,
                    time:stats.mtime,
                    timeString:stats.mtimeMs
                });
            }
            iterator(index + 1);
        })

    }(0));
});