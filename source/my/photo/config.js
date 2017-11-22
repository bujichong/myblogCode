module.exports = {
  numberNaming : true, //是否用序列命名文件
  justJson : false, //是否只输出Json，不处理图片
  filePath : "../../../photos/", //图片总目录
  fileOutPath : "../../../photos/out/", //图片输出目录
  jsonOutPath : "json/one/", //每个文件生成的json存放目录
  join : {//用来join的参数
    path : 'json/', //join对应的目录
      outFile : 'gallery.json', //全量输出文件名
      outAbsFile : 'abs.json', //摘要输出文件名
      outAllFile : 'all.json' //摘要输出文件名
  },
  thumb :{//输出thumb参数
    run : true, //是否输出thumb小图片
    pathName : 'thumb', //小图片对应在out里的目录
    type : 'w', //压缩处理文件类型  'auto'||'w'||'h' (宽高自动 || 限宽 || 限高)
    maxsize : 200, //最大尺寸
    quality : 90 //图片质量 0-100
  },
  gallery : {//输出gallery参数
    run : true, //是否输出gallery图片
    pathName : 'gallery', //gallery图片对应在out里的目录
    type : 'auto', //压缩处理文件类型  'auto'||'w'||'h' (宽高自动 || 限宽 || 限高)
    maxsize : 1500, //最大尺寸
    quality : 80 //图片质量 0-100
  },
  //要执行的文件目录
  //name 目录名称
  //title : title，可选参数，如果不写，取图片目录下的txt文件名称为title
  //info : info ，可选参数，如果不写，取图片目录下的txt文件内的文字
  //time : time ，可选参数，如果不写，取json文件生成的时间
  files : [{
      "name": "tom",
      // "title": "tom是个小男孩",
      // "info": "Tom是个可爱的小男孩，有时候比较顽皮，大多时候很懂得合作，多少有些内向，更多的时候，是个很阳光的孩子~",
      // "time": "2017-11-21 17:41:12"
    },{
      "name": "hangzhou",
      "title": "杭州之行",
      "info": "千岛湖、西湖、钱塘江边，每个人心中都有个江南，杭州与我是江南之次...",
      "time": "2017-11-21 17:36:44"
    },{
      "name": "jiaxing",
      "title": "梦中的嘉兴",
      "info": "每个人心中都有个江南，嘉兴就是我心中的江南...",
      "time": "2017-11-21 17:39:58"
      },{
      "name": "oldhome",
      "title": "老家的房子",
      "info": "回到老家，旧厂房里草木深深，简单的快乐，如此如此...",
      "time": "2017-11-21 17:40:35"
      },{
      "name": "wuzhen",
      "title": "永远的乌镇",
      "info": "乌镇一次，乌镇两次，还是那时的模样...",
      "time": "2017-11-21 17:35:59",
    }],
    //已处理的放在already中，做记录使用
    already : []
  }