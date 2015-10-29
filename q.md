# 问题集

## 中文回车后出现: 

DOMException: Failed to execute 'setStart' on 'Range': The offset -1 is larger than or equal to the node's length (0).(…)

问题原因:
res/editor.js
isComposing问题
中文回车后不触发 updateSectionList(newSectionList); 因为isComposing=1
```
    eventMgr.addListener('onSectionsCreated', function(newSectionList) {
        console.trace('onSectionsCreated ==> ' + isComposing);
        // isComposing = 0;
        if(!isComposing) {
            updateSectionList(newSectionList);
            highlightSections();
        }
        if(fileChanged === true) {
            // Refresh preview synchronously
            pagedownEditor.refreshPreview();
        }
        else {
            refreshPreviewLater();
        }
    });
```
为什么isComposing=1?

```
// 当浏览器有非直接的文字输入时, compositionstart事件会以同步模式触发.
.on('compositionstart', function() {
    console.trace('compositionstart !!!!!');
    isComposing++;
})
// 当浏览器是直接的文字输入时, compositionend会以同步模式触发.
// 中文输入完成后, 比如按空格时触发
// 为什么要异步-- ?
.on('compositionend', function() {
    console.log('compositionend !!')
    setTimeout(function() {
        isComposing--;
    }, 0);
})
```
因为空格后setTimeout了, 导致isComposing没有及时为0

解决方法:
去掉setimeout, 总执行updateSectionList(newSectionList)

可是中文回车还是有延迟!!

## 不要使用markdown 文本渲染, 用纯文本

editor.js, 把`text = Prism.highlight(text, Prism.languages.md);`注释即可, 不过scroll view没用了

```
if(!window.viewerMode) {
    text = Prism.highlight(text, Prism.languages.md);
}
```
解决不scrollSync
scrollSync.js
```
// life
// 因为如果左侧是纯文本编辑, delimiterElt.firstChild就是文本
if (delimiterElt.firstChild && delimiterElt.firstChild.nodeName != '#text') {
    delimiterElt = delimiterElt.firstChild;
}
```

## scrollSync 定位不准

1. 什么原因会停止scroll或定位不准, 有resize的时候, offset都变了, 但是scrollSync插件里面的没变, 所以需要buildSection

2. 什么时候buildSections ?
scrollSync.onPreviewFinished, scrollSync.onLayoutResize

