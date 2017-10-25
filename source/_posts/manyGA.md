---
layout: post
title: "为同一网站配置多个GA账号"
date: 2014-12-01 10:27
comments: true
tags:
	- google GA
	- 数据监测
---



谷歌分析生成的跟踪代码中会有一个唯一的数字ID帐户号码,例如:UA-XXXX-1,每个ID 会对应一个相应的GA配置文件，通常我们会按照官方提供的代码去部署，但是无法满足我们更多个性化应用需求，例如：我的网站有多个域，我希望不同的域的访问使用不同谷歌分析帐户；或者我希望同一网站部署多个帐户,帐户A分析所有的流量，帐户B只统计部分频道的流量；

下面我们先来看一段代码：

```javascript
<script type="text/javascript">
var gaJsHost = (("https:"== document.location.protocol) ? "https://ssl.": "http://www.");
document.write(unescape("%3Cscript src='"+ gaJsHost + "google-analytics.com/ga.js'type='text/javascript'%3E%3C/script%3E"));
</script>
<script src="http://www.google-analytics.com/ga.js"type="text/javascript"></script>
<script type="text/javascript">
varpageTracker = _gat._getTracker("UA-XXXXX-1");
pageTracker._trackPageview();
varotherTracker = _gat._getTracker("UA-YYYYY-1");
otherTracker._trackPageview();
</script>
```

在以上的代码中，我们可以看到不同的GA配置文件ID“UA-XXXXX-1”和”UA-YYYYY-1“ 当用户访问含有这段代码的网页后，首先GA会把数据发送到UA-XXXXX-1,然后在发送到UA-YYYYY-1,两个帐户
同时获取到了相应的数据，而且数据是相互独立的，甚至可以针对不同帐户应用不同的过滤器，得到你所需要的分析数据。
下面将列出几种常见应用是需要的GA代码部署:
**一、我有多个网域,我需要使用不同的帐户分析不同域的访问数据**

```javascript
<script type="text/javascript">
var gaJsHost = (("https:"== document.location.protocol) ? "https://ssl.": "http://www.");
document.write(unescape("%3Cscript src='"+ gaJsHost + "google-analytics.com/ga.js'type='text/javascript'%3E%3C/script%3E"));</script>
<script src="http://www.google-analytics.com/ga.js"type="text/javascript"></script>
<script type="text/javascript">
varpageTracker = _gat._getTracker("UA-xxxxx-1");
pageTracker._setDomainName('www.xxx.com');
pageTracker._trackPageview();
varotherTracker = _gat._getTracker("UA-yyyyy-1");
otherTracker._setDomainName('www.yyy.com');
otherTracker._trackPageview();
</script>
```

**二、在同一网站部署不同格式的代码**

有些谷歌分析代码，可能会根据不同格式的cookie写入数据,这样得出的数据可能对我们产生很多疑惑,请查看以下代码

```javascript
<script type="text/javascript">
var gaJsHost = (("https:"== document.location.protocol) ? "https://ssl.": "http://www.");
document.write(unescape("%3Cscript src='"+ gaJsHost + "google-analytics.com/ga.js'type='text/javascript'%3E%3C/script%3E"));
</script>
<script src="http://www.google-analytics.com/ga.js"type="text/javascript"></script>
<script type="text/javascript">
varpageTracker = _gat._getTracker("UA-xxxxx-1");
pageTracker._setAllowHash(false);
pageTracker._setAllowLinker(true);
pageTracker._trackPageview();
varotherTracker = _gat._getTracker("UA-yyyyy-1");
otherTracker._trackPageview();
</script>
```

以上代码中，我们会发现第一组帐户ID,”UA-xxxxx-1″使用的是跨域跟踪的代码，当然也是按照跨域跟踪的cookie算法来发送数据到谷歌分析的服务器，但第二组帐户ID，“UA-yyyyy-1”使用的是
谷歌分析官方提供的标准跟踪代码，和第一种算法当然也截然不同。我们可以使用这种部署方法来发现代码部署存在的问题！

**三、同一网站，我需要不同的页面得到独立的分析数据**

我们可能会遇到这样的应用，在同一网站下我希望不同的页面得到独立分分析数据，例如我们使用UA-xxxxx-1跟踪网页A，使用UA- yyyyy-1跟踪网页B。如果用户第一次进入访问了A网页，2天后，又再次访问，但是进入了B网页，这时谷歌分析会有综合浏览量等数据还是发送到A。

```javascript
<script type="text/javascript">
var gaJsHost = (("https:"== document.location.protocol) ? "https://ssl.": "http://www.");
document.write(unescape("%3Cscript src='"+ gaJsHost + "google-analytics.com/ga.js'type='text/javascript'%3E%3C/script%3E"));
</script>
<script src="http://www.google-analytics.com/ga.js"type="text/javascript"></script>
<script type="text/javascript">
varpageTracker = _gat._getTracker("UA-aaaaa-1");
pageTracker._trackPageview();
varotherTracker = _gat._getTracker("UA-bbbbb-1");
otherTracker._trackPageview();
</script>
```

**四、同一网站，不同用户类型访问（使用GA自定义段)，得到独立的分析数据**

假设我们是一个交友类型的网站，我们可以根据pageTracker._setVar获得用户的类型数据，不同类型的用户的访问，发送到不同的GA帐户.谷歌分析用户自定义区段值是存储在了cookie (__utmv)

```javascript
<script type="text/javascript">
var gaJsHost = (("https:"== document.location.protocol) ? "https://ssl.": "http://www.");
document.write(unescape("%3Cscript src='"+ gaJsHost + "google-analytics.com/ga.js'type='text/javascript'%3E%3C/script%3E"));
</script>
<script src="http://www.google-analytics.com/ga.js"type="text/javascript"></script>
<script type="text/javascript">
varpageTracker = _gat._getTracker("UA-xxxxx-1");
pageTracker._setVar('Member');
pageTracker._trackPageview();
varotherTracker = _gat._getTracker("UA-yyyyy-1");
otherTracker._setVar('Male');
otherTracker._trackPageview();
</script>
```

以上代码中，我们会发现，使用的是两端相同的代码.这段代码应用必须要注意，您不能使用第一段代码跟踪会员/非会员，第二段、第三段代码来跟踪定义的会员类型，例如是男性会员还是女性会员，因为我们使用的是_setVar，用户在此访问时会覆盖_setVar的处理。

**五、同一网站，使用不同的GA帐户，及不同cookie跟踪网站**

```javascript
<script type="text/javascript">
var gaJsHost = (("https:"== document.location.protocol) ? "https://ssl.": "http://www.");
document.write(unescape("%3Cscript src='"+ gaJsHost + "google-analytics.com/ga.js'type='text/javascript'%3E%3C/script%3E"));
</script><script src="http://www.google-analytics.com/ga.js"type="text/javascript"></script>
<script type="text/javascript">
varpageTracker = _gat._getTracker("UA-xxxxx-1");
pageTracker._setDomainName('xxx.com');
pageTracker._setCookiePath('/directory/');
pageTracker._trackPageview();
varotherTracker = _gat._getTracker("UA-yyyyy-1");
otherTracker._setDomainName('xxx.com');
otherTracker._trackPageview();
</script>
```

如果你想在同一网站跟踪所有的页面访问，并且希望单独跟踪特定目录的流量，则可以使用以上代码。这里需要注意的是。代码段1一定要部署到特定子目录下的网页，代码段2部署到所有的网页，这样
我们不仅可以得到所有的网站访问数据，还可以在UA-xxxxx-1的独立的目录下网页访问数据。