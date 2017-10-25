---
layout: post
title: "如何在windows下修改mysql的root密码"
date: 2016-02-25 21:52
comments: true
tags:
	- mysql
---

>mysql连接的时候，当root用户密码为空时，php无法连接数据库，
>为此必须先修改root用户密码(当然你也可以不用root做用户名连接数据，这里只是方便平时调试和学习使用，顺便记录一下)

### 分以下几个步奏：
**1，停止mysql服务**
cmd中输入  net stop mysql   //停止Mysql服务

**2，然后在my.ini文件中的[mysqld]下面一行添加 skip_grant_tables(加上这句话）**

**3，执行cmd，将目录切换到mysql目录下的bin目录**
如我的是C:\Program Files\MySQL\MySQL Server 5.0\bin
所以在cmd中输入cd C:\Program Files\MySQL\MySQL Server 5.1\bin

**4，重新开启mysql服务，然后**
在cmd中输入 mysql -uroot -p ,这时cmd将切换成mysql模式
在mysql中输入
UPDATE user SET Password=PASSWORD(‘newpassword’) where USER=’root’
好了，现在你的root密码已经更改成newpassword了

**5，将my.ini中添加的 skip_grant_tables 删除**

ok，可以了~~~