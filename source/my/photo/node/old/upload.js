let qiniu = require('qiniu');
const fs = require("fs");
let accessKey = 'wES4WGtcHK797z5abp3Bgq3CPhC1cgA6vFq2Tkzn';
let secretKey = '3qm2nJtprgwQGLpOICw0UCDYXnf5x_Sp9KRx_O2w';
let bucket =  'bujichong';

const promise = new Promise(function(resolve, reject) {//获取uploadToken
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let options = {
      scope: bucket,
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken=putPolicy.uploadToken(mac);

  // if (true){
    resolve(uploadToken);
  // } else {
  //   reject(error);
  // }
});

promise.then(function (uploadToken) {//上传图片
    console.log(uploadToken);
    // let uploadToken = 'wES4WGtcHK797z5abp3Bgq3CPhC1cgA6vFq2Tkzn:QjxMFSe1kbKsmX2MuPpeSawkkO0=:eyJzY29wZSI6ImJ1amljaG9uZyIsImRlYWRsaW5lIjoxNTExNTE5NjQwfQ==';
    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z2;//华南

    var localFile = ["images/loader.gif","images/pinstripe.gif"];
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();

    // 文件上传
    localFile.forEach(function (item,i) {
        var key= item;
        formUploader.putFile(uploadToken, key, item, putExtra, function(respErr,
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



});







