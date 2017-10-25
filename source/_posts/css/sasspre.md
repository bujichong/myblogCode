---
layout: post
title: "sass里写百分比宽度"
date: 2014-11-14 12:02
comments: true
tags:
	- css
	- sass
---



最近在用sass，记下一例：

在css里写这样的代码是比较容易的，

```css
.w10{width:10%}
```

但是在sass里,如果我要用循环

```scss
@for $i from 1 to 10 {
.wp#{$i}0 {
   width: #{$i}%;
}
}
```

这样就报错了，
变量后不能用%，
想了很多办法，用引号引住%,或者加/\，但是不管用，
说来说去，这里毕竟还是css，并不识别这些符号为注释符号。

看到函数这节，豁然开朗，写了如下

```scss
@function per($a){@return $a+'%';}
@for $i from 1 to 5 {
.wp#{$i} {
   width: per(#{$i});
}
}
```

运行生成：

```css
.wp1 {
  width: 1%;
}
 
.wp2 {
  width: 2%;
}
 
.wp3 {
  width: 3%;
}
 
.wp4 {
  width: 4%;
}
```

Ok了

真正正确的写法应该是如此：

```scss
@for $i from 1 through 20 {
.wp#{$i*5} {width: 5%*$i;}
}
```

