let qiniu = require('qiniu');

let accessKey = 'wES4WGtcHK797z5abp3Bgq3CPhC1cgA6vFq2Tkzn';
let secretKey = '3qm2nJtprgwQGLpOICw0UCDYXnf5x_Sp9KRx_O2w';
let bucket =  'bujichong';
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let options = {
  scope: bucket,
};
let putPolicy = new qiniu.rs.PutPolicy(options);
let uploadToken=putPolicy.uploadToken(mac);
console.log(uploadToken);