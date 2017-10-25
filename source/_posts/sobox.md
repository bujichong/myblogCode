---
layout: post
title: "soJs系列：1，jQuery弹窗控件sobox2.0"
date: 2014-12-02 21:30
comments: true
tags:
	- jquery
	- jquery plugin
	- sobox
---

> 开篇扯淡几句和sobox不相干的话，
> so系列js从soChange开始，
> 我在工作中就一直在不停的扩充，
> 个人感觉写的比较好的有sobox,soTree,soValidate,
> 比较实用的有soChange,soScrollTo,soLazy。
> 而我也早都想分享一下这个插件，至少在现在这个环境下，个人感觉sobox还是写的不错的，
> so系列脚本沿袭我一向的风格，
> css做的事情交给css去做，js精炼简单，其实稍微读一下基本没什么难度，
> 整体来说，每个插件的代码量都不大，sobox压缩完也就8k的样子，但是功能很完整。
> 论实用性，api接口都是我在实践中不断改进出来的，
> 经过这2年的修修补补，基本是没有太多的改动了。





ok，简单介绍一下，具体的大家看详细的API和实例
sobox提供 ‘**content**’,’**target**’,’**ajax**’,’**iframe**’ 四种模式，
弹窗可多位置定位，兼容ie6+，其他现代浏览器就更不要说了，
并快捷支持**alert**,**confirm**,**tip**,**loading**,**overTip**等方法，
在实际应用中可根据项目实际需要灵活定制。



sobox界面清爽，熟悉样式的童鞋可以轻松重新定制界面

![](/images/sobox-1.png)

以下是sobox的全部参数：

```javascript
$.sobox.pop({
	 /* 弹出类型及类型参数 */
	type : 'content', // 弹窗内容模式:'content','target','ajax','iframe'，每个模式分别对应每个参量
	target : null, // target方式，target目标，如 '.detail','#contbox'
	content : null, // content方式，支持html
	iframe : null, // iframe方式，值为iframe目标页链接，如：http:// www.baidu.com/
	ajax:{url:null,data:null,callback:function(){}}, // ajax方式
 
	 /* 位置信息 */
	posType:'center', // 'center,win,doc,tc,bc' 位置类型：居中 | 距window顶部 | 距离doucment顶部定 | top水平居中 | bottom水平居中
	pos:[0,0], // [x,y] 距离document左上角坐标,set模式使用
	offset:[0,0], // [x,y] 弹窗相对本来设定位置偏移量,center模式只改变y轴
 
	 /* 自定义参数 */
	cls : null, // 添加自定义类名
	width:360,height:null, // 宽高属性,iframe模式下，height为iframe高度
	defaultShow:true, // 直接显示pop
	visibility:true, // 默认pop执行后显示（用于部分复杂处理场景）
	title : '提示', // 默认标题
	showTitle:true, // 标题栏隐藏：默认显示
	outCloseBtn : false, //标题上的关闭按钮是否外置 ：默认内置
	showMask : true, // 显示遮罩
	onlyOne : false, // 为true时，同一状态下只显示一个pop
	drag :true, // 是否可拖动
	maskClick : true, // 点击背景关闭内容
	btn : [], // {cls:,text'确定',link:,removePop: true,callback:}
 
	 /* 返回事件 */
	beforePop:function(){}, // 窗口打开之前返回事件
	onPop: function(){}, // 窗口打开返回事件
	closePop: function(){} // 窗口关闭返回事件
});
```

详细API和实例： <http://www.bujichong.com/sojs/sobox/index.html>

gitpub地址： <https://github.com/bujichong/sojs/tree/master/sobox>

原谅我有时慵懒，但是有问题，我基本还是会修正和改进的，欢迎大家批评指正~