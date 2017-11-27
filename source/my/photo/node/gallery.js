const fs = require("fs");
const {bjTime,fileType,resizeImg,mkdirFilePath,getToken} = require("./tools");
const qiniu = require('qiniu');

module.exports = {
  gallery : function (opt,callback) {
    let filesLen = opt.files.length;
    let finished = 0;
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
                    finished++;
                    console.log('处理完第'+finished+'/'+filesLen+'个文件夹,#^_^#');
                    if (finished===filesLen) {callback&&callback()};//全部完成返回事件
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
  },
  jsonJoin : function (opt,callback) {
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
                fs.writeFile(opt.join.path+opt.join.outFile , JSON.stringify(arr, null, "\t"));//输出合并json
                fs.writeFile(opt.join.path+opt.join.outAbsFile , JSON.stringify(absArr, null, "\t"));//输出摘要json
                fs.writeFile(opt.join.path+opt.join.outAllFile , JSON.stringify(allArr, null, "\t"));//输出全量文件扁平合格json
                console.log('处理完毕,#^_^#');
                callback && callback();
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
  },
  uploadQiniu : function (opt , jsonFile) {
      const promise = new Promise(function(resolve, reject) {//获取uploadToken
        let uploadToken=getToken(opt.qiniu);
        resolve(uploadToken);
      });


      promise.then(function (uploadToken) {//上传图片
          // console.log(uploadToken);
          let file= jsonFile || (opt.join.path+opt.join.outAllFile);
          console.log('上传文件对应的json路径：'+file);
          try{
            let uploadData = JSON.parse(fs.readFileSync( file));
            if (uploadToken&&uploadData&&uploadData.data&&uploadData.data.length) {

                var config = new qiniu.conf.Config();
                config.zone = qiniu.zone[opt.qiniu.zone];// 空间对应的机房

                // var localFile = ["images/loader.gif","images/pinstripe.gif"];
                var formUploader = new qiniu.form_up.FormUploader(config);
                var putExtra = new qiniu.form_up.PutExtra();

                // 文件上传
                uploadData.data.forEach(function (item,i) {
                    let localFile = opt.fileOutPath + item.name;
                    let key= item.name;
                    formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
                      respBody, respInfo) {
                      if (respErr) {
                        throw respErr;
                      }
                      if (respInfo.statusCode == 200) {
                        console.log(respBody);
                      } else {
                        console.log(respInfo.statusCode);
                        console.log(respBody);
                      }
                    });
                });

            };
          }catch(e){
            console.error('需要上传文件的json路径不正确~');
          }


      });

  }
}