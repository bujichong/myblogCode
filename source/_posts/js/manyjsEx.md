---
layout: post
title: "常用js正则"
date: 2014-11-28 13:43
comments: true
tags:
	- javascript
	- js
	- 正则
---

常要用到，不够的慢慢补全~

基础字符（英文字母、数字和下划线’）：

```javascript
/^\w+$/.test(val)
```



中文、英文字母、数字和下划线：

```javascript
/^[\u0391-\uFFE5\w]+$/.test(val)
```



数字：

```javascript
/^[\d]+([\.][\d]+){0,1}$/.test(val)
```



邮箱验证：

```javascript
var ismail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
ismail.test("aaa@aa.com");
```



手机号码验证：

```javascript
var isMobile=/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;
isMobile.test("18721323517");
```



座机号码验证：

```javascript
var isPhone=/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
isPhone.test("021-666666");
```



邮政编码：

```javascript
/^[0-9]{6}$/.test(val)
```



车牌号：

```javascript
/^[A-Za-z0-9]{6}$/.test(val)
```

