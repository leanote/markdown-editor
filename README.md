# Markdown Editor For Leanote

## 命令

确保在此之前安装了node, gulp
```
> gulp # 生成res-min/main.js (https://github.com/leanote/leanote/blob/master/public/dist/main.js)
> gulp minify # 压缩main.js -> main.min.js (https://github.com/leanote/leanote/blob/master/public/dist/main.min.js)
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

## Leanote如何使用?
将 `res-min/main.minjs` 复制到leanote的 `/public/dist/` 下

node-dev.html:

```html
<script>
initPage();
// 当tinymce.dev.js时, 请注释require
window.require = {
    baseUrl: '/public',
};
</script>

<!-- pro_markdown_js -->

<!-- dev -->
<script src="/js/require.js"></script>
<script src="/public/dist/main.min.js"></script>
<!-- /dev -->

<script src="/public/js/plugins/main.js"></script>
</body>
```

## Leanote 开发

替换node-dev.html

```html
<script>
initPage();
window.require = {
    baseUrl: '/public/res', // res指向源码
};
</script>

<!-- pro_markdown_js -->

<!-- dev -->
<script src="/js/require.js"></script>
<script src="/public/res/main.js"></script>
<!-- /dev -->

<!--
不要
<script src="/public/js/plugins/main.js"></script>
-->
</body>
```