# Markdown Editor For Leanote

Leanote's Markdown Editor originally forked from [Stackedit](https://github.com/benweet/stackedit). The Stackedit source is under Apache License (http://www.apache.org/licenses/LICENSE-2.0) and the code updated by Leanote is under GPL v2.

## Branches

* [master](https://github.com/leanote/desktop-app) Markdown Editor For [Leanote](https://github.com/leanote/leanote)
* [desktop-app](https://github.com/leanote/markdown-editor/tree/desktop-app) Markdown Editor For [Leanote Desktop App](https://github.com/leanote/desktop-app)
* [ios](https://github.com/leanote/markdown-editor/tree/ios) Markdown Editor For [Leanote iOS](https://github.com/leanote/leanote-ios)

## Build

Please install `node` and `gulp` firstly.

```
> gulp # build res-min/main.js (https://github.com/leanote/leanote/blob/master/public/dist/main.js)
> gulp minify # compress main.js to main.min.js (https://github.com/leanote/leanote/blob/master/public/dist/main.min.js)
```

## Local Debug

```
> node server.js
```

See: http://localhost:3000/editor.html

![](screenshot.png)

## Main Files

* main.js [Entry]
* editor.js [Main]
* core.js [Core]
* lib/Markdown.Editor.js [Markdown Core]

## Integrated With Leanote

Copy `res-min/main.min.js` to leanote's path `/public/dist/`.

Update node-dev.html with:

```html
<script>
initPage();
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

## Source Debug With Leanote 

Replace node-dev.html with:

```html
<script>
initPage();
window.require = {
    baseUrl: '/public/res', // link to res
};
</script>

<!-- pro_markdown_js -->

<!-- dev -->
<script src="/js/require.js"></script>
<script src="/public/res/main.js"></script>
<!-- /dev -->

<!--
<script src="/public/js/plugins/main.js"></script>
-->
</body>
```

----------------------------------------

## 构建

确保在此之前安装了node, gulp
```
> gulp # 生成res-min/main.js (https://github.com/leanote/leanote/blob/master/public/dist/main.js)
> gulp minify # 压缩main.js -> main.min.js (https://github.com/leanote/leanote/blob/master/public/dist/main.min.js)
```

## 本地调试

```
> node server.js
```

访问: http://localhost:3000/editor.html

![](screenshot.png)

## 主要文件

* main.js [入口]
* editor.js [主要]
* core.js [主要]
* lib/Markdown.Editor.js [主要]

## Leanote 使用 Markdown 编辑器

将 `res-min/main.min.js` 复制到leanote的 `/public/dist/` 下

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

## Leanote 调试 Markdown 编辑器的源码

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