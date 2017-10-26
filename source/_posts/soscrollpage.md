---
layout: post
title: "soJs系列：2,jQuery插件soScrollPage，让我们轻松愉快地做一个苹果产品页面"
date: 2014-12-04 11:59
comments: true
tags:
	- jquery
	- jquery plugin
---

> 想必苹果产品页的效果大家都很熟悉了，单页面上下切换，每切换一次都有飞入和飞出效果，
> 这种效果已经在很多网站上被大肆模仿，
> 加上现在比较炫丽的css3效果，让页面效果更漂亮，
> 但要实现这样的效果工作量也是很大的，
> 对js，css的水平要求也比较高
> soScrollPage是我在工作中根据页面展示需要做的一个插件，
> 封装了单页进入和飞出事件，对单页里的元素只要用类似animate设置css的方式就可以实现我们想实现的效果了，
> 插件是完全用jQuery的animate动画和一些的基本操作来实现的，
> 这样如果我们不使用css3完全可以做成兼容ie6的很多炫丽页面。

**ok,首先是soScrollPage的api接口：**

例如我们把页面都放在一个id叫 gpsIntroBox 的盒子里

```javascript
$('#gpsIntroBox').soScrollPage({
	scrollbox : '#pageScrollbox',//滚动包裹对象
	page : '.page',//页class
	pageClsH : 'soScrollPage-',//为每页单独定义的cls头，会生成 soScrollPage-0 , soScrollPage-1 这样的class，方便每页dom查找，如无冲突，一般不用修改
	thumbCls : 's-pageThumb',//thumb class,
	btnPrev : null,//切换到上一页的按钮对象
	btnNext : null,//切换到下一页的按钮对象
	minDuring : 300,//每页离开时最少停留时间
	animateOpt : null//动画参数对象
});
```

这里是所有的参数，实际应用中我们如果和默认参数相同就不用修改了

我们的html结构大体如下：
![](/images/soscrollpage-1.png)

单页页面里有我们需要展示的元素，展开page1这个div，里面的元素大概如下：
![](/images/soscrollpage-2.png)

这里style里都是js运行后生成的，
下面来看看我们的js调用：
在页面的最底下：

```javascript
$(function () {
	$('#gpsIntroBox').soScrollPage({
		animateOpt : an
	});
})
```

这里我们只设置了animateOpt为an，
an是我们的动画参数对象数组，

**举例如下：**

```javascript
var an = [
	//0 第一页动画对象
	{"in":[//进入时操作动画数组
			{o:'.h3-title',//动画对象
				fn : {css:{top:'-150px'},addClass:'h3-now'},//函数事件，可以执行css、addClass、removeClass、removeAttr等jQuery默认支持的属性操作事件,
				fx:[{animate:{top:'120px'},during:600}]//动画事件，可以执行animate，另外可以设置delay时间
			},
			{o:'.p-intro',
				fn : {css:{top:'-250px'},addClass:'p-now'},
				fx:[{animate:{top:'250px'},during:800}]//在进入800ms后执行
			},
			{o:'.s-i-1',fn:{css:{marginLeft:'1200px'}},fx:[{animate:{marginLeft:'-216px'},during:400,delay:400}]},//在进入400ms后执行
			{o:'.s-i-2',fn:{css:{marginLeft:'1200px'}},fx:[{animate:{marginLeft:'-96px'},during:600,delay:400}]},
			{o:'.s-i-3',fn:{css:{marginLeft:'1200px'}},fx:[{animate:{marginLeft:'24px'},during:800,delay:400}]},
			{o:'.s-i-4',fn:{css:{marginLeft:'1200px'}},fx:[{animate:{marginLeft:'144px'},during:1000,delay:400}]}
		],
		"out":[//飞出时操作动画数组
			{o:'.h3-title',
				fn : {removeClass:'h3-now',removeAttr:'title'},
				fx:[{animate:{top:'60px'},during:200,delay:400},{animate:{top:'1220px'},during:700}]
			},
			{o:'.p-intro',
				fn : {removeClass:'p-now',removeAttr:'title'},
				fx:[{animate:{top:'1250px'},during:600,delay:600}]
			},
			{o:'.s-i-1',fx:[{animate:{marginLeft:'-1200px'},during:400}]},
			{o:'.s-i-2',fx:[{animate:{marginLeft:'-1200px'},during:600}]},
			{o:'.s-i-3',fx:[{animate:{marginLeft:'-1200px'},during:800}]},
			{o:'.s-i-4',fx:[{animate:{marginLeft:'-1200px'},during:1000}]}
		]
	},
  ...//省略
  ...
	//5 第6页
	{"in" : [
			{o:'.a-test',fx:[{animate:{marginTop:'-70px',opacity:1},during:600}]},
			{o:'.s-sys',fx:[{animate:{marginTop:'-5px',opacity:1},during:1000}]}
		],
	"out" : [
			{o:'.a-test',fx:[{animate:{marginTop:'-40px',opacity:0},during:900}]},
			{o:'.s-sys',fx:[{animate:{marginTop:'-55px',opacity:0},during:600}]}
		]
	}

]
```

ok，这个动画对象是不是看起来比较直观而且比较灵活呢？

最后是实现效果，大家可以[** 猛击这里**](/my/soScrollPage/index.html)

样式部分就看个人了，基本来说都是绝对定位，推荐最好对page进行百分比定位，