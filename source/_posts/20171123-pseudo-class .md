---
layout: post
title: "css3下的伪类:before和:after"
date: 2017-11-23 11:45
comments: true
tags:
	- jquery
	- webuploader
---

> 抛弃旧版本浏览器的兼容性，写起样式来真是爽多了，这篇记录一些伪类的使用及相关的一些css3属性

其实不光是伪类，随便写写最近常用的一些关于样式上的应用 。

## 绝对尺寸单位 rem

全部rem绝对是对旧版本浏览器宣布再见，但想要高度自适应还有什么比rem绝对单位更好的选择。

在 base.css 的 reset 部分就这样写啦

```css
@media screen and (max-width: 1200px) {
  html{font-size: 75%;}
}
@media (min-width: 1200px) and (max-width: 1400px){
  html{font-size: 87.5%;}
}
@media(min-width: 1400px){
  html{font-size: 100%;}
}
```

还可以针对更小宽度的界面进行设置， 比如 width 小于480,320，基本可以当手机浏览处理。还有用js来处理基础字号来实现弹性布局，原理相同，不过那个可以操控的更准确。

然后我们就可以对所有元素采用 rem来定义各种宽高了。

例如：

```css
.txt-search{
  float: left;
  height:5rem;
  width:14.5rem;
  padding:0 0.5rem;
  font-size:1.5rem;
  border:0.2rem solid #ddd;
  background:url(../images/icon/i-shopsearch.png) no-repeat 100% center;-webkit-background-size:cover;background-size:cover;
}

```

所有尺寸单位都用rem，这样随着屏幕宽度的变化，字号、宽高、间距等等都随着字高一起变化。

## :nth-child() 选择器

这个不是什么新鲜或者生僻的东西，但是之前确实很少用，总是通过两个容器，外层 **overflow:hidden** 内层超过宽度来处理，或者奇偶变色通过js来处理...赶紧淘汰掉这些古董浏览器吧。

````css
p:nth-child(odd){
	background:#ff0000;
}
p:nth-child(even){
	background:#0000ff;
}
p:nth-child(3n+0){
	background:#ff0000;
}
````

## :before 与 :after

举个典型例子：

![after](\images\after.png)

```css
.ul-group-pros .li-pro:after{
content:'+';
position: absolute;
left:15rem;top:22%;
font-size:2rem;color:#444;
}
.ul-group-pros .li-pro:last-child::after{content:'=';}
```

这里 用了双重的伪类，这里如果用背景图片，或者在页面里写一些和内容相关的代码是不是会麻烦很多呢？

## 伪类结合 css的counter-reset和 counter-increment属性

用css来进行计算，这比较有趣

css代码如：

```css
.article {
	counter-reset: figures;
}

.figure {
	counter-increment: figures;
}

.figure figcaption:before {
	content: 'Fig. ' counter(figures) ' - ';
}
```

这样可以用来命名一个批量的格式，自动生成序列

效果：

![css-counter](\images\css-counter.png)

具体示例在这里：https://tympanus.net/Tutorials/AutomaticFigureNumbering/



## 设置 webkit浏览器滚动条

我说的主要是 chrome浏览器，修改默认的浏览器样式，主要是设置 **::-webkit-scrollbar** 相关属性。

```css
::-webkit-scrollbar {width: 8px;height: 8px;background-color:#fff;}
::-webkit-scrollbar-track {background-color:#ccc;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);}
::-webkit-scrollbar-track:hover {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.4);background-color:#fefefe;}
::-webkit-scrollbar-track:active {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.4);background-color:#f0f0f0;}
::-webkit-scrollbar-thumb {background-color: rgba(0,0,0,0.2);-webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,.2);}
::-webkit-scrollbar-thumb:hover {background-color: rgba(0,0,0,0.4);-webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,.1);}
::-webkit-scrollbar-thumb:active {background: rgba(0,0,0,0.6);}
```

