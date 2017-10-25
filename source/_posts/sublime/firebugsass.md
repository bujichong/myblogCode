---
layout: post
title: "在firebug中调试显示用sublime text 2编译的scss代码"
date: 2014-11-20 16:53
comments: true
tags:
	- css
	- sass
	- firebug
	- firefox
---

在 sublime text 2中想直接`ctrl+B`就编译写的sass代码吗？
可以的，
安装Sass 和 SASS Build 两个插件就可以。
（当然你得先安装ruly+sass，也行还顺便还安装compass），
安装ruly就不说，顺着往下：

**1，安装SASS：** 在开始菜单中打开 **“Start Command Prompt with Ruby” **
输入：
```cmake
gem install sass
```
等待cmd提示安装成功就ok啦~

**2，在 sublime text 2中安装 Sass 和 SASS Build **
怎么安装就不用讲了， Ctrl + Shift + P调出控制台安装，或者在google或百度里搜一下地址吧，下载安装包下来放到 sublime text 2下的“**\Data\Packages**”目录中。
安装完成后，scss的文件就有了高亮了，另外编译系统下多了2个sass项（”tools–编译系统”下找到sass命令，**注意：**默认只有 ” SASS”和”SASS – Compressed”）
![firebugsass-1](/images/firebugsass-1.png)

**3，安装firefox插件：“FireCompass for Firebug”**
这个插件装好已经为我们能在firebug的html面版里看到sass内容做好准备了。
这时候你`ctrl+B`能直接把sass文件编译成css文件了。
我们打开fireubg，看html右侧的css面版，显示的还是编译后的css，
为什么呢？因为如果要fireCompass插件显示sass源码，必须在编译后的css文件里显示对应sass的行号，像下面这样：
![](/images/firebugsass-2.png)
只有这样firebug的插件才知道哪一行css对应scss文件里的哪一行代码。
那这就需要我们在sublime text 2插件编译的时候开启添加行号功能。
ok，那我们就开始干吧~
我们找到sublime text 2 下 “Data\Packages\SASS-Build”文件夹，这里面有2个文件 “.sublime-build”文件，这2个文件对应着“编译系统”菜单里的2个项，
打开一看就明白了，原来就是自动执行cmd编译命令，
![](/images/firebugsass-3.png)
那想开启添加行号，我们需要在执行时添加一个 “**–line-numbers**”命令就可以，具体sass编译参数都神马 意思，大家可以去查sass手册，我这儿就不挨个扯淡了。
ok，接下来
**4**，复制 “**SASS.sublime-build**”文件，改名为“**SASS – Compact.sublime-build**”，
把cmd对应的那行改为：
```
"cmd": ["sass", "--update", "$file:${file_path}/${file_base_name}.css", "--stop-on-error", "--no-cache", "--line-numbers","--style", "compact"],
```
添加了 “**–line-numbers**”和“**compact**”两个参数，
compact的意思是精简排版css，就是单行回车显示每条样式。效果如第二个图那样,
最后，我们回到sublime text中，这时候“编译系统”就有三个SASS命令了，点击把编译选项勾选到“**SASS – Compact**”上，如图一，
Ctrl+B,回到页面，看firebug面版：
![](/images/firebugsass-4.png)
是不是这里已经显示scss了呢~
ok，搞定~