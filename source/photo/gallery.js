"use strict";

const fs = require("fs");
const images = require("images");
const path = "../../photos/";
const outfile = "gallery.json";
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
        let newsize = size;

        if(wh>=1){//图片宽>高
            if (maxsize<size.width) {
                img.resize(maxsize)//等比缩放图像到maxsize像素宽
                newsize = {width:maxsize,height:Math.floor(maxsize/wh)};
            };
        }else{//图片宽<高
            if(maxsize<size.height){
                img.resize(null,maxsize)//等比缩放图像到maxsize像素高
                newsize = {width:Math.floor(maxsize*wh),height:maxsize};
            }
        }
        img.save(path + "/" + name, {
            quality : quality  //保存图片到文件,图片质量为60
        });
        return {newsize};
    }

    (function iterator(index) {

        if (index == files.length) {
            fs.writeFile(outfile, JSON.stringify(arr, null, "\t"));
            return;
        }

        fs.stat(sourcePath + "/" + files[index], function (err, stats) {
            if (err) {
                return;
            }

            resizeImg(files[index],thumbPath,300,90);
            let sz = resizeImg(files[index],galleryPath,1500,80);

            if (stats.isFile()) {
                arr.push({
                    name:files[index],
                    // ow:sz.size.width,
                    // oh:sz.size.height,
                    w:sz.newsize.width,
                    h:sz.newsize.height,
                    time:stats.mtime,
                    timeString:stats.mtimeMs
                });
            }
            iterator(index + 1);
        })

    }(0));
});