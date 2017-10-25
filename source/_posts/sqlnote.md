---
layout: post
title: "sql批量事件处理写法"
date: 2016-03-04 16:48
comments: true
tags:
	- sql
---

>不知道为什么网上充斥着那么多错误答案。

** 批量更新(示例)：**
```sql
update hd_category set del = case cid when 1 then 0 when 2 then 0 end where cid in (1,2)
```

** 换行分解为：**
```
update hd_category set del =
case cid
  when 1 then 0
  when 2 then 0
end
where cid in (1,2)
```

** 批量插入（示例）：**
```sql
INSERT INTO hd_category(cname , del) values('val1', 0), ('val2', 0), ('val3', 0);
```
** 批量删除（示例）：**
```sql
delete from hd_category where cid in (28,29,30)
```
