# Markdown Editor for Leanote IOS

## 命令

```
> gulp # 运行, 生成res-min/main.js
> gulp minify # 将res-min的文件合并至leanote-ios
```

## 如何本地调试 ?

1. 访问
public/editor-mobile-require.html

2. 访问
public/editor-mobile.html?debug

显示preview: LEAMD.togglePreview();


## 目录

* res 源码
* res-min 打包后调试, 对应 https://github.com/leanote/leanote-ios/tree/master/Leanote/editor/MarkdownAssetsRaw
* leanote-ios IOS版正式, 对应 https://github.com/leanote/leanote-ios/tree/master/Leanote/editor/MarkdownAssets
* editor-mobile-require.html 使用res/main.js
* editor-mobile.html 使用res-min/main.js