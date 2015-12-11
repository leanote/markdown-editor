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

## API

### LEAMD 全局

```
var LEAMD = {
  mdEditorO: $('#mdEditor'),

  // 初始化
  init: function() {
  },

  // 预览
  togglePreview: function() {
  },
  // 编辑
  toggleWrite: function() {
  },

  // 插入图片
  insertImage: function(urls, alt) {
  },
  // 插入链接
  insertLink: function(url, title) {
  },
  // 加粗/取消
  setBold: function() {
  },
  // 斜体/取消
  setItalic: function() {
  },
  // 水平线
  setHorizontalRule: function() {
  },
  // 标题
  setHeading: function() {
  },
  // 引用
  setBlockquote: function() {
  },
  // 无充列表
  setUnorderedList: function() {
  },
  // 有充列表
  setOrderedList: function() {
  },

  // 得到Filed对象, 更多方法详见下文
  // field == 'zss_field_title' or zss_field_content
  getField: function(field) {
  },

  // 备份range, 链接添加之前, textColor, bgColor
  backupRange: function() {
  },

  // restore之
  // 图片插入后, 取消, 取消链接都会执行这个
  // 会focus输入框
  restoreRange: function() {
  }
};
```
### Filed对象方法

```
// 可写
Field.enableEditing = function() {
}
// 不可写
Field.disableEditing = function () {
};

// 设置HTML
Field.setHTML = function(html) {
},

// 设置纯文本 标题用到
Field.setPlainText = function(html) {
},
// 得到纯文本, 标题用到
Field.strippedHTML = function() {
},
// 获取HTML
Field.getHTML = function() {
}

// 是否acive
Field.isFocused = function() {
};

// focus
Field.focus = function() {
};

// blur
Field.blur = function() {
};

// 是否有plcehoder
Field.hasPlaceholderText = function() {
};
// 设置placeholder
Field.setPlaceholderText = function(placeholder) {
};

// 设置placehoder color
Field.setPlaceholderColor = function(color) {
};

```

### 示例

请使用 打包好的 public/leanote-ios, 并用webview加载editor-mobile.min.html

```
webview加载了之后, 立即调用:

// 1. 初始化
LEAMD.init();

// 2. 设置内容
// 设置标题
LEAMD.getField('zss_field_title').setPlainText('Markdown title');
// 设置内容
LEAMD.getField('zss_field_content').setHTML('# life');

// 3. 切换可写与只读

// 切换到可写
LEAMD.toggleWrite();
// 切换到只读
LEAMD.togglePreview();

// 4. 工具调用

// 当工具栏要设置加粗时
LEAMD.setBold();
// 插入图片
LEAMD.insertImage('leanote://file/image/123223', 'title');
```
