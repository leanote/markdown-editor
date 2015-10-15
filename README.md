# Markdown Editor For Leanote

## 命令

```
> npm install

> gulp # 运行, 生成res-min/main.js
> gulp minify 将main.js -> main.min.js
```

将 main.min.js copy 到 leanote public/dist/ 下

## 如何本地调试 ?

node server.js

访问: http://localhost:3000/editor.html

## 经常修改文件

main.js 入口
editor.js 
core.js [主要]
lib/Markdown.Editor.js [主要]

## Leanote如何使用?

<script src="/js/require.js"></script>
<script src="/public/dist/main.js"></script>

## Leanote 开发

替换node-dev.html

```
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

正常的node-dev.html:

```
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

![](screenshot.png)
