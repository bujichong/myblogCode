---
layout: post
title: "自定义被选中文字的背景色：css之selection"
date: 2014-12-02 21:30
comments: true
tags:
	- css
	- selection
---



经常看到一片文字被选中后，文字背景色不是默认的深蓝色，而是其他色，如：

![](/images/selection-1.gif)

经常见，但是总忽视这个问题，既然想起来，
马上到群里问了问，
原来是使用了对象的selection属性

```css
.detailsBox p::selection{
background:#68DFFB; 
}
```

自己写了写，呵呵，这css属性还是有些小细节要注意，大致如下：

**1，目前的ie都不支持（ie9未测试），所以这种自定义的被选中背景色，应该都是在非ie浏览器里才能看到的**

**2，firefox和其他webkit浏览器实现代码不同：**

```css
.detailsBox p::selection{
background:#68DFFB;/*webkit*/
}
 
.detailsBox p::-moz-selection{
background:red;/*moz*/
}
```

注意这里是双冒号，而非伪类的一个冒号…..忽见此属性还是感觉有点奇怪

**3，实现上容易出现的错误：**
**1/用逗号隔开的样式写法**

```css
.detailsBox p::selection,
.detailsBox p::-moz-selection{
background:red; 
}
```

这样写貌似没有问题，但是方法失效

**2/此属性只可应用在文字标签的最内层上，不支持继承**，何意？如：

```css
.detailsBox div::selection{
background:#68DFFB;
}
.detailsBox div::-moz-selection{background:#68DFFB;}
```

如上代码，我们好像把这个属性给了div，div内的对象可以继承，至少我们写字体的行高，字体大小属性是这样的，但事实这样写是无效的，显示结果如：

![](/images/selection-2.gif)

我的html代码如：

```html
<div class="detailsBox">
    安全审计主要面对企业内部信息资产的访问过程，进行全程记录分析。
    <p><a href="http://www.hunnu.edu.cn" target="_blank">http://www.hunnu.edu.cn</a></p>
    <p>　　内网安全审计主要面对企业内部信息资产的访问过程，进行全程记录分析。</p>
</div>
```

从结果上显示可以看出只有div直接包住的文字背景色变色了，而p及p中的a都没有受到影响。

这是这个属性有点奇怪的地方，
当然我们可以用通配符的写法让div中的所有对象都匹配上selection属性，如：

```css
.detailsBox *::selection{
background:#68DFFB;}
.detailsBox *::-moz-selection{background:#68DFFB;}
```

这样杀伤力是否太大？

**4，实现出来的效果稍有不同：**
firefox中 背景是有间距的，
ie中文字被选中背景色的效果也如ff中一样有间距，只是还不支持这种自定义背景色

![](/images/selection-3.gif)

而在chorme中有全选的感觉，背景是铺满整个被选中的文字：

![](/images/selection-4.gif)

另外如果我们想禁用用户选择文字：

```css
moz-user-select: -moz-none;
-moz-user-select: none;
-o-user-select:none;
-khtml-user-select:none;
-webkit-user-select:none;
-ms-user-select:none;
user-select:none;
```

以上是 selection 属性的一些小总结，简单体验感觉，不正确的地方望知者指出