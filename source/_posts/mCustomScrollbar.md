---
layout: post
title: "jQuery自定义滚动条插件mCustomScrollbar"
date: 2015-09-12 21:53
comments: true
tags:
	- jquery
	- javascript
---

>这个不是我原创，
>
>不过确实好用，为了备忘，特留此篇。

插件地址： [点击这里](http://manos.malihu.gr/jquery-custom-content-scroller/)

## mCustomScrollbar 的参数介绍

mCustomScrollbar 这个插件的功能巨大，所以参数也很多，参数值当然更多。在介绍参数的时候，我想先为新手介绍两种参数值的写法，分别是直接的和合并的。

我们平时接触的插件用的参数，都是直接跟着参数写上参数值，这个比较直观简单。在这个插件中，参数值太多，所以把一些参数合并起来写。例如下面要介绍到的 scrollButtons 这个参数，它又有四个子属性：enable、scrollType、scrollSpeed、scrollAmount，这四个属性也分别有自己的值，来实现相应的功能。如果再加上其他的参数，那么我们应该这样写：

```javascript
$("#main").mCustomScrollbar({
	scrollButtons:{
		enable:false,
		scrollType:"continuous",
		scrollSpeed:20,
		scrollAmount:40
	},
 	horizontalScroll:false,
});
```

一定要注意闭合的括号和语句之间的逗号，新手可能会因为不小心，没有严格的按照这个规则写导致插件无法运行。好，下面我们介绍详细的参数。

- **set_width:false**：设置你内容的宽度 值可以是像素或者百分比
- **set_height:false**：设置你内容的高度 值可以是像素或者百分比
- **horizontalScroll:Boolean**：是否创建一个水平滚动条 默认是垂直滚动条 值可为:true(创建水平滚动条) 或 false
- **scrollInertia:Integer**：滚动的惯性值 在毫秒中 使用0可以无滚动惯性 (滚动惯性可以使区块滚动更加平滑)
- **scrollEasing:String**：滚动动作类型 查看 [jquery UI easing](http://view.jqueryui.com/formcontrols/demos/effect/easing.html) 可以看到所有的类型
- **mouseWheel:String/Boolean**：鼠标滚动的支持 值为:true.false,像素 默认的情况下 鼠标滚动设置成像素值 填写false取消鼠标滚动功能
- **mouseWheelPixels:Integer**：鼠标滚动中滚动的像素数目 值为以像素为单位的数值
- **autoDraggerLength:Boolean**：根据内容区域自动调整滚动条拖块的长度 值:true,false
- **scrollButtons:{ enable:Boolean }**：是否添加 滚动条两端按钮支持 值:true,false
- **scrollButtons:{ scrollType:String }**：滚动按钮滚动类型 值:”continuous”(当你点击滚动控制按钮时断断续续滚动) “pixels”(根据每次点击的像素数来滚动)
- **scrollButtons:{ scrollSpeed:Integer }**：设置点击滚动按钮时候的滚动速度(默认 20) 设置一个更高的数值可以更快的滚动
- **scrollButtons:{ scrollAmount:Integer }**：设置点击滚动按钮时候每次滚动的数值 像素单位 默认 40像素
- **advanced:{ updateOnBrowserResize:Boolean }**：根据百分比为自适应布局 调整浏览器上滚动条的大小 值:true,false 设置 false 如果你的内容块已经被固定大小
- **advanced:{ updateOnContentResize:Boolean }**：自动根据动态变换的内容调整滚动条的大小 值:true,false 设置成 true 将会不断的检查内容的长度并且据此改变滚动条大小 建议除非必要不要设置成 true 如果页面中有很多滚动条的时候 它有可能会产生额外的移出 你可以使用 update 方法来替代这个功能
- **advanced:{ autoExpandHorizontalScroll:Boolean }**：自动扩大水平滚动条的长度 值:true,false 设置 true 你可以根据内容的动态变化自动调整大小
- **advanced:{ autoScrollOnFocus:Boolean }**：是否自动滚动到聚焦中的对象 例如表单使用类似TAB键那样跳转焦点 值:true false
- **callbacks:{ onScrollStart:function(){} }**：使用自定义的回调函数在滚动时间开始的时候执行
- **callbacks:{ onScroll:function(){} }**：自定义回调函数在滚动中执行 Demo 同上
- **callbacks:{ onTotalScroll:function(){} }**：当滚动到底部的时候调用这个自定义回调函数 Demo 同上
- **callbacks:{ onTotalScrollBack:function(){} }**：当滚动到顶部的时候调用这个自定义回调函数 Demo 同上
- **callbacks:{ onTotalScrollOffset:Integer }**：设置到达顶部或者底部的偏移量 像素单位
- **callbacks:{ whileScrolling:function(){} }**：当用户正在滚动的时候执行这个自定义回调函数
- **callbacks:{ whileScrollingInterval:Integer }**：设置调用 whileScrolling 回调函数的时间间隔 毫秒单位

下面是所有参数的列表和它们的默认值

```javascript
$(".content").mCustomScrollbar({
	set_width:false,
	set_height:false,
	horizontalScroll:false,
	scrollInertia:550,
	scrollEasing:"easeOutCirc",
	mouseWheel:"auto",
	autoDraggerLength:true,
	scrollButtons:{
		enable:false,
		scrollType:"continuous",
		scrollSpeed:20,
		scrollAmount:40
	},
	advanced:{
		updateOnBrowserResize:true,
		updateOnContentResize:false,
		autoExpandHorizontalScroll:false,
		autoScrollOnFocus:true
	},
	callbacks:{
		onScrollStart:function(){},
		onScroll:function(){},
		onTotalScroll:function(){},
		onTotalScrollBack:function(){},
		onTotalScrollOffset:0,
		whileScrolling:false,
		whileScrollingInterval:30
	}
});
```

## mCustomScrollbar 的使用方法

**update**

用法：$(selector).mCustomScrollbar(“update”);

调用 mCustomScrollbar 函数的 update 方法去实时更新滚动条当内容发生变化（例如 通过 Javascript 增加或者移除一个对象、通过 ajax 插入一段新内容、隐藏或者显示一个新内容等）

下面是例子：

```javascript
$(".content .mCSB_container").append("<p>New content here...</p>");
$(".content").mCustomScrollbar("update");

$(".content .myImagesContainer").append("<img src='myNewImage.jpg' />");
$(".content .myImagesContainer img").load(function(){
	$(".content").mCustomScrollbar("update");
});

$("#content-1").animate({height:800},"slow",function(){
  $(this).mCustomScrollbar("update");
});
```

**scrollTo**

用法：$(selector).mCustomScrollbar(“scrollTo”,position);

你可以使用这个方法自动的滚动到你想要滚动到的位置。这个位置可以使用字符串（例如 “#element-id”，“bottom” 等）描述或者是一个数值（像素单位）。下面的例子将会滚动到最下面的对象

```javascript
$(".content").mCustomScrollbar("scrollTo","last");
```

scrollTo 方法的参数

- **$(selector).mCustomScrollbar(“scrollTo”,String);**：滚动到某个对象的位置，字符串型的值可以是 id 或者 class 的名字
- **$(selector).mCustomScrollbar(“scrollTo”,”top”);**：滚动到顶部（垂直滚动条）
- **$(selector).mCustomScrollbar(“scrollTo”,”bottom”);**：滚动到底部（垂直滚动条）
- **$(selector).mCustomScrollbar(“scrollTo”,”left”);**：滚动到最左边（水平滚动条）
- **$(selector).mCustomScrollbar(“scrollTo”,”right”);**：滚动到最右边（水平滚动条
- **$(selector).mCustomScrollbar(“scrollTo”,”first”);**：滚动到内容区域中的第一个对象位置
- **$(selector).mCustomScrollbar(“scrollTo”,”last”);**：滚动到内容区域中的最后一个对象位置
- **$(selector).mCustomScrollbar(“scrollTo”,Integer);**：滚动到某个位置（像素单位）

scrollTo 方法还有两个额外的选项参数

- **moveDragger: Boolean**：滚动滚动条的滑块到某个位置像素单位，值：true，flase。例如：$(selector).mCustomScrollbar(“scrollTo”,200,{ moveDragger:true });
- **callback：Boolean**：执行回调函数当 scroll-to 完成之后，值：true，false 例如：$(selector).mCustomScrollbar(“scrollTo”,200,{ callback:true });

**disable**

用法：$(selector).mCustomScrollbar(“disable”);

调用 disable 方法去使滚动条不可用。如果想使其重新可用，调用 update方法。disable 方法使用一个可选参数（默认 false）你可以设置 true 如果你想重新让内容区域滚动当 scrollbar 不可用时。例如：

```javascript
$(".content").mCustomScrollbar("disable",true);
```

**destroy**

用法：$(selector).mCustomScrollbar(“destroy”);

调用 destroy 方法可以移除某个对象的自定义滚动条并且恢复默认样式

[为了]()更加直观的看到要定义的滚动条区域，官方给出了一张非常形象的图片

![](/images/mCustomScrollbar-1.png)