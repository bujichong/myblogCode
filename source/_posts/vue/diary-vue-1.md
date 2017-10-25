---
layout: post
title: "vue入坑 cmd指令"
date: 2017-10-10 13:54
comments: true
tags:
	- vue
	- mvvm
	- javascript
---


### 1，安装node


### 2，(可选项)安装淘宝镜像
```javascript
npm install -g cnpm –registry= https://registry.npm.taobao.org
cnpm -v //查看版本
```
### 3，安装webpack
```javascript
npm install webpack -g
```
安装完成之后输入 webpack -v

### 4，安装vue-cli脚手架构建工具
```javascript
npm install vue-cli -g
```
安装完成之后输入 vue -V（注意这里是大写的“V”）

### 5，使用vue-cli来构建项目
项目目录下：
```javascript
vue init webpack exprice——————— 这个是那个安装vue脚手架的命令
This will install Vue 2.x version of the template. ———————这里说明将要创建一个vue 2.x版本的项目
For Vue 1.x use: vue init webpack#1.0 exprice
Project name (exprice) ———————项目名称
Project name exprice
Project description (A Vue.js project) ———————项目描述
Project description A Vue.js project
Author Datura ——————— 项目创建者
Author Datura
Vue build (Use arrow keys)
Vue build standalone
Install vue-router? (Y/n) ——————— 是否安装Vue路由，也就是以后是spa（但页面应用需要的模块）
Install vue-router? Yes
Use ESLint to lint your code? (Y/n) n ———————是否启用eslint检测规则，这里个人建议选no
Use ESLint to lint your code? No
Setup unit tests with Karma + Mocha? (Y/n)
Setup unit tests with Karma + Mocha? Yes
Setup e2e tests with Nightwatch? (Y/n)
Setup e2e tests with Nightwatch? Yes
vue-cli · Generated “exprice”.
To get started: ——————— 这里说明如何启动这个服务
cd exprice ———————进入到项目目录
npm install ——————— 包安装
npm run dev ———————dev模式下运行
```

### 6，单独安装vue-router
cnpm install vue-router vue-resource –save
贴一张盗图：
![](/images/inVue-1.png)
![](/images/inVue-2.png)

>vue入坑原始 [完整教程](http://www.jianshu.com/p/1626b8643676)

