# Markdown Editor For Leanote Desktop App

## 命令

确保在此之前安装了node, gulp
```
> gulp # 生成res-min/main.js (https://github.com/leanote/desktop-app/blob/master/public/md/main.js)
> gulp minify # 压缩main.js -> main.min.js (https://github.com/leanote/desktop-app/blob/master/public/md/main.min.js)
```

## 如何本地调试 ?

```
> node server.js
```

访问: http://localhost:3000/editor.html

![](screenshot.png)

## 主要文件

* main.js 入口
* editor.js [主要]
* core.js [主要]
* lib/Markdown.Editor.js [主要]

## Leanote Desktop App 如何使用?
将res-min/main.js复制到 leanote-dekstop-app 的 `/public/md/` 下