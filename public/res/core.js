/*globals MD:true, Markdown */
define([
	"underscore",
	"crel",
	"editor",
	// "layout",
	// "constants",
	"utils",
	// "storage",
	"settings",
	"eventMgr",
	'pagedown'
], function( _, crel, editor, utils, settings, eventMgr) {

	var core = {};

	// life commonjs使用
	MD = editor;

	// Used to detect user activity
	var isUserReal = false;
	var userActive = false;
	var userLastActivity = 0;

	function setUserActive() {
		isUserReal = true;
		userActive = true;
		var currentTime = utils.currentTime;
		if(currentTime > userLastActivity + 1000) {
			userLastActivity = currentTime;
			eventMgr.onUserActive();
		}
	}

	// Load settings in settings dialog
	// var $themeInputElt;

	// Create the PageDown editor
	var pagedownEditor;
	var fileDesc;
	core.initEditorFirst = function() {
		// Create the converter and the editor
		var converter = new Markdown.Converter();
		var options = {
			_DoItalicsAndBold: function(text) {
				// Restore original markdown implementation
				text = text.replace(/(\*\*|__)(?=\S)(.+?[*_]*)(?=\S)\1/g,
					"<strong>$2</strong>");
				text = text.replace(/(\*|_)(?=\S)(.+?)(?=\S)\1/g,
					"<em>$2</em>");
				return text;
			}
		};
		converter.setOptions(options);
		
		pagedownEditor = new Markdown.Editor(converter, undefined, {
			undoManager: editor.undoMgr
			// ,
			// helpButton: { handler: markdownHelp },
	        // strings: "Markdown syntax"
		});

		MD.insertLink2 = pagedownEditor.insertLink;

		// Custom insert link dialog
		pagedownEditor.hooks.set("insertLinkDialog", function(callback) {
			core.insertLinkCallback = callback;
			utils.resetModalInputs();
			$(".modal-insert-link").modal();
			return true;
		});
		// Custom insert image dialog
		pagedownEditor.hooks.set("insertImageDialog", function(callback) {
			core.insertLinkCallback = callback;
			if(core.catchModal) {
				return true;
			}
			utils.resetModalInputs();
			var ifr = $("#leauiIfrForMD");
			if(!ifr.attr('src')) {
				ifr.attr('src', '/tinymce/plugins/leaui_image/index.html?md=1');
			}

			$(".modal-insert-image").modal();
			return true;
		});

		eventMgr.onPagedownConfigure(pagedownEditor);
		pagedownEditor.hooks.chain("onPreviewRefresh", eventMgr.onAsyncPreview);
		pagedownEditor.run();
		// editor.undoMgr.init();

		// Hide default buttons
		$(".wmd-button-row li").addClass("btn btn-success").css("left", 0).find("span").hide();

		// Add customized buttons
		var $btnGroupElt = $('.wmd-button-group1');
		
		$("#wmd-bold-button").append($('<i class="fa fa-bold">')).appendTo($btnGroupElt);
		$("#wmd-italic-button").append($('<i class="fa fa-italic">')).appendTo($btnGroupElt);
		$btnGroupElt = $('.wmd-button-group2');
		$("#wmd-link-button").append($('<i class="fa fa-link">')).appendTo($btnGroupElt);
		$("#wmd-quote-button").append($('<i class="fa fa-quote-left">')).appendTo($btnGroupElt);
		$("#wmd-code-button").append($('<i class="fa fa-code">')).appendTo($btnGroupElt);
		$("#wmd-image-button").append($('<i class="fa fa-picture-o">')).appendTo($btnGroupElt);
		$btnGroupElt = $('.wmd-button-group3');
		$("#wmd-olist-button").append($('<i class="fa fa-list-ol">')).appendTo($btnGroupElt);
		$("#wmd-ulist-button").append($('<i class="fa fa-list-ul">')).appendTo($btnGroupElt);
		$("#wmd-heading-button").append($('<i class="fa fa-header">')).appendTo($btnGroupElt);
		$("#wmd-hr-button").append($('<i class="fa fa-ellipsis-h">')).appendTo($btnGroupElt);
		$btnGroupElt = $('.wmd-button-group5');
		$("#wmd-undo-button").append($('<i class="fa fa-undo">')).appendTo($btnGroupElt);
		$("#wmd-redo-button").append($('<i class="fa fa-repeat">')).appendTo($btnGroupElt);
		$("#wmd-help-button").show();
	};

	core.initEditor = function(fileDescParam) {
		if(fileDesc !== undefined) {
			eventMgr.onFileClosed(fileDesc);
		}
		fileDesc = fileDescParam;

		// If the editor is already created, 返回之
		// 再fileDEsc有什么用?
		if(pagedownEditor !== undefined) {
			editor.undoMgr.init();
			return pagedownEditor.uiManager.setUndoRedoButtonStates();
		}
		core.initEditorFirst();
		editor.undoMgr.init();
	};

	// Initialize multiple things and then fire eventMgr.onReady
	// 主入口
	core.onReady = function() {
		// Add RTL class
		document.body.className += ' ' + settings.editMode;

		// 这里, 以后肯定都是bodyEditorHTML, 用bodyEditorHTML不是这里加载的, 直接在html写上
		// document.body.innerHTML = bodyEditorHTML;

		// Initialize utils library
		utils.init();

		// Detect user activity
		$(document).mousemove(setUserActive).keypress(setUserActive);

		// 先发送事件, 不然partialRendering有问题
		eventMgr.onReady();

		// 布局, 一些事件, 比如打开左侧menu
		// layout.init();
		core.initEditorFirst();
		editor.init();

		// life
		// var fileDesc = {content: ""};
		// eventMgr.onFileSelected(fileDesc);
		// core.initEditor(fileDesc);
	};

	// Other initialization that are not prioritary
	eventMgr.addListener("onReady", function() {

		$(document.body).on('shown.bs.modal', '.modal', function() {
			var $elt = $(this);
			setTimeout(function() {
				// When modal opens focus on the first button
				$elt.find('.btn:first').focus();
				// Or on the first link if any
				$elt.find('button:first').focus();
				// Or on the first input if any
				$elt.find("input:enabled:visible:first").focus();
			}, 50);
		}).on('hidden.bs.modal', '.modal', function() {
			// Focus on the editor when modal is gone
			editor.focus();
			// Revert to current theme when settings modal is closed
			// applyTheme(window.theme);
		}).on('keypress', '.modal', function(e) {
			// Handle enter key in modals
			if(e.which == 13 && !$(e.target).is("textarea")) {
				$(this).find(".modal-footer a:last").click();
			}
		});

		// Click events on "insert link" and "insert image" dialog buttons
		$(".action-insert-link").click(function(e) {
			var value = utils.getInputTextValue($("#input-insert-link"), e);
			if(value !== undefined) {
				core.insertLinkCallback(value);
				core.insertLinkCallback = undefined;
			}
		});
		// 插入图片
		$(".action-insert-image").click(function() {
			// 得到图片链接或图片
			var value = document.mdImageManager.mdGetImgSrc();
			// var value = utils.getInputTextValue($("#input-insert-image"), e);
			if(value) {
				core.insertLinkCallback(value);
				core.insertLinkCallback = undefined;
			}
		});

		// Hide events on "insert link" and "insert image" dialogs
		$(".modal-insert-link, .modal-insert-image").on('hidden.bs.modal', function() {
			if(core.insertLinkCallback !== undefined) {
				core.insertLinkCallback(null);
				core.insertLinkCallback = undefined;
			}
		});

		// Avoid dropdown panels to close on click
		$("div.dropdown-menu").click(function(e) {
			e.stopPropagation();
		});

		// 弹框显示markdown语法
		$('#wmd-help-button').click(function() {
	        window.open("http://leanote.com/blog/view/531b263bdfeb2c0ea9000002");
		});

		// Load images
		_.each(document.querySelectorAll('img'), function(imgElt) {
			var $imgElt = $(imgElt);
			var src = $imgElt.data('stackeditSrc');
			if(src) {
				$imgElt.attr('src', window.baseDir + '/img/' + src);
			}
		});

	// 	if(window.viewerMode === false) {
	// 		// Load theme list
	// 		var themeOptions = _.reduce(constants.THEME_LIST, function(themeOptions, name, value) {
	// 			return themeOptions + '<option value="' + value + '">' + name + '</option>';
	// 		}, '');
	// 		document.getElementById('input-settings-theme').innerHTML = themeOptions;
	// 	}
	});

	return core;
});
