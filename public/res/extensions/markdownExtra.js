/*globals Markdown */
define([
	// "jquery",
	"underscore",
	"utils",
	"logger",
	"classes/Extension",
	// "ext!html/markdownExtraSettingsBlock.html",
	'google-code-prettify',
	// 'highlightjs',
	'crel',
	'pagedownExtra'
], function( _, utils, logger, Extension, prettify) {

	var markdownExtra = new Extension("markdownExtra", "Markdown Extra", true);
	// markdownExtra.settingsBlock = markdownExtraSettingsBlockHTML;
	markdownExtra.defaultConfig = {
		extensions: [
			"fenced_code_gfm",
			"tables",
			"def_list",
			"attr_list",
			"footnotes",
			// "smartypants",
			"strikethrough",
			"newlines"
		],
		intraword: true,
		comments: true,
		highlighter: "highlight"
	};

	var eventMgr;
	markdownExtra.onEventMgrCreated = function(eventMgrParameter) {
		eventMgr = eventMgrParameter;
	};

	var previewContentsElt;
	markdownExtra.onReady = function() {
		previewContentsElt = document.getElementById('preview-contents');
	};

	markdownExtra.onPagedownConfigure = function(editor) {
		var converter = editor.getConverter();
		var extraOptions = {
			extensions: markdownExtra.config.extensions,
			highlighter: "prettify"
		};

		if(markdownExtra.config.intraword === true) {
			var converterOptions = {
				_DoItalicsAndBold: function(text) {
					text = text.replace(/([^\w*]|^)(\*\*|__)(?=\S)(.+?[*_]*)(?=\S)\2(?=[^\w*]|$)/g, "$1<strong>$3</strong>");
					text = text.replace(/([^\w*]|^)(\*|_)(?=\S)(.+?)(?=\S)\2(?=[^\w*]|$)/g, "$1<em>$3</em>");
					// Redo bold to handle _**word**_
					text = text.replace(/([^\w*]|^)(\*\*|__)(?=\S)(.+?[*_]*)(?=\S)\2(?=[^\w*]|$)/g, "$1<strong>$3</strong>");
					return text;
				}
			};
			converter.setOptions(converterOptions);
		}
		if(markdownExtra.config.comments === true) {
			converter.hooks.chain("postConversion", function(text) {
				return text.replace(/<!--.*?-->/g, function(wholeMatch) {
					return wholeMatch.replace(/^<!---(.+?)-?-->$/, ' <span class="comment label label-danger">$1</span> ');
				});
			});
		}
		/*
		if(markdownExtra.config.highlighter == "highlight") {
			var previewContentsElt = document.getElementById('preview-contents');
			editor.hooks.chain("onPreviewRefresh", function() {
				_.each(previewContentsElt.querySelectorAll('.prettyprint > code'), function(elt) {
					!elt.highlighted && hljs.highlightBlock(elt);
					elt.highlighted = true;
				});
			});
		}
		else if(markdownExtra.config.highlighter == "prettify") {
			editor.hooks.chain("onPreviewRefresh", prettify.prettyPrint);
		}
		*/
		editor.hooks.chain("onPreviewRefresh", function() {
			$('#preview-contents pre').addClass('prettyprint linenums');
			prettify.prettyPrint();
		});
		Markdown.Extra.init(converter, extraOptions);
	};

	return markdownExtra;
});
