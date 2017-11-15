"use strict";
const fs = require("fs");
const images = require("images");
const path = "../../photos/";
const sourcePath = path + "source";
const galleryPath = path + "gallery";
const thumbPath = path + "thumb";

fs.readdir(sourcePath, function (err, files) {
    if (err) {
        return;
    }
    console.log(files);
    let arr = [];

    function resizeImg (name,path,maxsize,quality) {
        const img = images(sourcePath + "/" + name)//加载图像文件
        const size = img.size();
        const wh = size.width/size.height;
        let newsize;

        if(wh>1){
            img.resize(maxsize)//等比缩放图像到400像素宽
            newsize = {width:maxsize,height:Math.floor(maxsize/wh)};
        }else{
            img.resize(null,maxsize)//等比缩放图像到400像素高
            newsize = {width:Math.floor(maxsize*wh),height:maxsize};
        }
        img.save(path + "/" + name, {
            quality : quality  //保存图片到文件,图片质量为60
        });
        return newsize;
    }

    (function iterator(index) {

        if (index == files.length) {
            fs.writeFile("gallery.json", JSON.stringify(arr, null, "\t"));
            return;
        }

        fs.stat(sourcePath + "/" + files[index], function (err, stats) {
            if (err) {
                return;
            }

            resizeImg(files[index],thumbPath,400,90);
            let newsize = resizeImg(files[index],galleryPath,900,80);

            if (stats.isFile()) {
                arr.push({
                    name:files[index],
                    width:newsize.width,
                    height:newsize.height,
                    time:stats.mtime,
                    timeString:stats.mtimeMs
                });
            }
            iterator(index + 1);
        })


    }(0));
});