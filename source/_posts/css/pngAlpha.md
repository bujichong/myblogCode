---
layout: post
title: "GIF和几种PNG(8/24/32)以及Alpha/索引色透明对比"
date: 2014-11-28 13:43
comments: true
tags:
	- css
	- png
	- gif
---



![](/asset/blogImg/pnggif-1.png)

![](/asset/blogImg/pnggif-1.png)

PNG这种文件格式值得科普下,对比GIF来说

**PNG和GIF都支持动画**
PNG的动画也叫APNG,只是firefox支持,详见 <http://ooxx.me/apng.orz> ,如Firefox看这里的favicon,是会动滴
所以动画图片来说,还是GIF支持最好

**第一种PNG叫PNG8(索引色透明)**,简单说可以理解为静态的GIF
他们都只有256色,也支持索引透明,就是指定一个像素点是不是透明
但是PNG由于算法的优势,体积比较少
所以,静态GIF完全可用PNG8取代

**第二种PNG也叫PNG8(Alpha透明)**,牛逼在可指定像素点的透明度,例如50%透明度
这种优点在于比PNG24/32体积小,但效果一样
缺点在于IE6支持不好,~~~~会把半透明的像素点显示成全透明

**第三种PNG叫PNG24**
和PNG8的区别仅在于体积更大

**更正**: PNG24不透明,但是颜色数很多,不止256色
而Photoshop里导出的png24其实是png32

**第四种PNG叫PNG32**
和photoshop的PSD一样,是Fireworks的默认源文件格式,包含图层和通道信息
和PNG24的区别在于有图层
缺点在于IE6支持不好,会把透明区域显示成蓝灰底色

**更正**: PNG32和PNG24的区别就是多了透明信息

**(新增)第五种PNG叫Fireworks源文件**
类似于Phosothop的PSD,有图层通道信息神马的
是PNG的一种扩展
这种丢到浏览器里表现和PNG32一样

简单的归纳就是

**动画**:
支持: GIF, APNG只在firefox支持
不支持: 非Firefox的PNG

**索引色透明**(某像素是全透明还是全不透明):
支持: GIF/PNG都支持
不支持: **IE6下**的PNG8(Alpha透明)和PNG24/32

**Alpha透明**(可指定透明度)**: **
支持:PNG8(Aplha透明)/PNG32
不支持: GIF/PNG8(索引色透明)/PNG24

**图层**
支持: PNG(FW源文件)
不支持: PNG8/PNG24/PNG32/GIF

**颜色**
256色：GIF PNG8(2种)
其他的格式颜色数不过来,好多

**附加说明:**

Photoshop 只能创建GIF、 PNG8(索引透明)和PNG24(其实是PNG32)

![](/asset/blogImg/pnggif-3.png)

Fireworks 能创建任意格式的GIF和PNG

![](/asset/blogImg/pnggif-4.png)

PNG8(索引透明)在创建的时候有个参数叫(PS杂边|FW色板),这个作用就是用杂边色加上像素点的透明度例如50%,生成伪透明的不透明像素点
适用于固定底色的伪半透明,例子里用的杂边是黑色,在白背景下就很明显

PNG8(Alpha透明)在IE6下会有过度裁剪的问题,可能是把半透明的像素都去掉了,所以某些图片会如最上面第一张图所示,被狗咬的感觉
规避方案:

1.用2张图,IE6用PNG8(索引透明),非IE6用PNG8(Alpha透明),在CSS里用_这个IE6hack来区别
2.半透明在作图的时候就要考虑到被去掉后的样子,对设计师有要求,不大现实
3.说服自己接受这坨大便,然后咽下去就这样了你想咋样

静态GIF、PNG 24、PNG32不大推荐在网页上用

