---
layout: post
title: "整理了一套图标 soIcon"
date: 2017-09-28 16:33
comments: true
tags:
	- css
	- soJs
	- 小技巧
---

用 [icomoon](https://icomoon.io/app/#/select)
把 icomoon free 和 fontawesome整合了一下，去掉了一些国外社交网站的logo图标，
另外把之前一套在iconfont上整理的图标整理了进去，
打包下来以后，重写给他的demo写了一下样式，
另外做了一个搜索的脚本，可以直接通过搜索框过滤图标，
这些都不复杂，却很方便，
一共1000多个图标，这下图标基本整理到位了，查阅起来很方便。
上地址 ：  [猛击这里](/my/soicon/demo.html)
下载文件： [猛击这里](/my/soicon/soicon.zip)

### 具体整合步骤：
- 在 icomoon.io上将图标合并，合并教程：  如何合并两个图标库
- 下载图标后覆盖所有soicon文件夹
- 复制以下 代码内容 到 demo.html 的head标签中，位置如下所示：
```html
<!–[if lt IE 8]><!–>
<link rel=”stylesheet” href=”ie7/ie7.css”>
<!–<![endif]–>

<!–从这里开始–>
<link type="text/css" rel="stylesheet" href="plus/plus.css" />
<script type="text/javascript" src="plus/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="plus/plus.js"></script>
<!–到这里结束–>
</head>
```
- 单独使用，可以增加调用style-plus.css，实现图标多尺寸、动画旋转、角度旋转等变化

font icon文件怎么使用就不说了，外行看热闹，会用的人自然不用解释。




