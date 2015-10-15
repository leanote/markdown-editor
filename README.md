# Markdown Editor for Leanote iOS

Leanote's Markdown Editor originally forked from [Stackedit](https://github.com/benweet/stackedit). The Stackedit source is under Apache License (http://www.apache.org/licenses/LICENSE-2.0) and the code updated by Leanote is under GPL v2.

## Branches

* [master](https://github.com/leanote/desktop-app) Markdown Editor For [Leanote](https://github.com/leanote/leanote)
* [desktop-app](https://github.com/leanote/markdown-editor/tree/desktop-app) Markdown Editor For [Leanote Desktop App](https://github.com/leanote/desktop-app)
* [ios](https://github.com/leanote/markdown-editor/tree/ios) Markdown Editor For [Leanote iOS](https://github.com/leanote/leanote-ios)

## Build

Please install `node` and `gulp` firstly.

```
> gulp # build res-min/main.js
> gulp minify # build res-min to leanote-ios
```

## Local Debug

1. See
public/editor-mobile-require.html

2. or See
public/editor-mobile.html?debug

Toggle Preview: `LEAMD.togglePreview();`

## Main Files

* `res/` Main source code
* `res-min/` Build path, <-> https://github.com/leanote/leanote-ios/tree/master/Leanote/editor/MarkdownAssetsRaw
* `leanote-ios/` iOS Release path, <-> https://github.com/leanote/leanote-ios/tree/master/Leanote/editor/MarkdownAssets
* `editor-mobile-require.html` Run with res/main.js
* `editor-mobile.html` Run with res-min/main.js

-------------------------------

## 构建

确保之前安装了 `node`, `gulp`.

```
> gulp # 运行, 生成res-min/main.js
> gulp minify # 将res-min的文件合并至leanote-ios
```

## 本地调试

1. 访问
public/editor-mobile-require.html

2. 或者访问
public/editor-mobile.html?debug

显示preview: `LEAMD.togglePreview();`

## 主要文件及目录

* `res/` 源码
* `res-min/` 打包后调试, 对应 https://github.com/leanote/leanote-ios/tree/master/Leanote/editor/MarkdownAssetsRaw
* `leanote-ios/` IOS版正式, 对应 https://github.com/leanote/leanote-ios/tree/master/Leanote/editor/MarkdownAssets
* `editor-mobile-require.html` 使用res/main.js
* `editor-mobile.html` 使用res-min/main.js