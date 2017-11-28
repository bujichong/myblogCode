---
layout: post
title: "css3之object-fit"
date: 2017-11-24 09:45
comments: true
tags:
	- css
---

> 在页面中，我们想对服务器传过来的一张图片给固定的宽高，but，还想让他保持宽高比，这麻烦吗？用了object-fit就不难了。

**object-fit** 值包括：

```css
.fill { object-fit: fill; }
.contain { object-fit: contain; }
.cover { object-fit: cover; }
.none { object-fit: none; }
.scale-down { object-fit: scale-down; }
```

这些值的含义：

- **fill**: 中文释义“填充”。默认值。替换内容拉伸填满整个content box, 不保证保持原有的比例。
- **contain**: 中文释义“包含”。保持原有尺寸比例。保证替换内容尺寸一定可以在容器里面放得下。因此，此参数可能会在容器内留下空白。
- **cover**: 中文释义“覆盖”。保持原有尺寸比例。保证替换内容尺寸一定大于容器尺寸，宽度和高度至少有一个和容器一致。因此，此参数可能会让替换内容（如图片）部分区域不可见。
- **none**: 中文释义“无”。保持原有尺寸比例。同时保持替换内容原始尺寸大小。
- **scale-down**: 中文释义“降低”。就好像依次设置了**none**或**contain**, 最终呈现的是尺寸比较小的那个。

可能这样解释不够直观，抄个例子：

![20171128-object-fit](\images\20171128-object-fit.png)

so，如果我们想实现图片指定宽高还能保持比例，样式大概是这样：

```css
.box{width:200px;height:150px;}
.box img{width:100%;height:100%;object-fit: cover;}
```

ok，我觉得我解释清楚了。