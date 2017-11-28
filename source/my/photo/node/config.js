const filesData = require("./data");
module.exports = {
  numberNaming : true, //是否用序列命名文件
  justJson : true, //是否只输出Json，不处理图片
  filePath : "../../../../photos/", //图片总目录
  fileOutPath : "../../../../photos/out/", //图片输出目录
  jsonOutPath : "../json/one/", //每个文件生成的json存放目录
  join : {//用来join的参数
    path : '../json/', //join对应的目录
    outFile : 'gallery.json',//合并输出文件名
    outAbsFile : 'abs.json', //摘要输出文件名
    outAllFile : 'all.json'//扁平全量json输出文件名
  },
  qiniu : {//七牛账号信息——用于上传，详细参数及nodeAPI : https://developer.qiniu.com/kodo/sdk/1289/nodejs
    accessKey : 'wES4WGtcHK797z5abp3Bgq3CPhC1cgA6vFq2Tkzn',
    secretKey : '3qm2nJtprgwQGLpOICw0UCDYXnf5x_Sp9KRx_O2w',
    bucket :  'bujichong',//文件容器
    zone : 'Zone_z2',//空间对应机房区域：华南
    picHost : 'http://photo.bujichong.com/'//对应域名
  },
  thumb :{//输出thumb参数
    run : false, //是否输出thumb小图片
    // pathName : 'thumb', //小图片对应在out里的目录
    pathName : '', //小图片对应在out里的目录
    type : 'w', //压缩处理文件类型  'auto'||'w'||'h' (宽高自动 || 限宽 || 限高)
    maxsize : 200, //最大尺寸
    quality : 90 //图片质量 0-100
  },
  gallery : {//输出gallery参数
    run : true, //是否输出gallery图片
    // pathName : 'gallery', //gallery图片对应在out里的目录
    pathName : '', //gallery图片对应在out里的目录
    type : 'auto', //压缩处理文件类型  'auto'||'w'||'h' (宽高自动 || 限宽 || 限高)
    maxsize : 1500, //最大尺寸
    quality : 80 //图片质量 0-100
  },
  //要执行的文件目录
  files : filesData.files
  }