// RequireJS configuration
/*global requirejs */
requirejs.config({
	waitSeconds: 0,
	packages: [
		/*
		{
			name: 'css',
			location: 'bower-libs/require-css',
			main: 'css'
		},
		*/
		{
			name: 'less',
			location: 'bower-libs/require-less',
			main: 'less'
		}
	],
	paths: {
		// jquery: 'bower-libs/jquery/jquery',
		underscore: 'bower-libs/underscore/underscore',
		crel: 'bower-libs/crel/crel',
		jgrowl: 'bower-libs/jgrowl/jquery.jgrowl',
		mousetrap: 'bower-libs/mousetrap/mousetrap',
		'mousetrap-record': 'bower-libs/mousetrap/plugins/record/mousetrap-record',
		toMarkdown: 'bower-libs/to-markdown/src/to-markdown',
		text: 'bower-libs/requirejs-text/text',
		mathjax: 'libs/MathJax/MathJax.js?config=TeX-AMS_HTML',
		// bootstrap: 'bower-libs/bootstrap/dist/js/bootstrap',
		requirejs: 'bower-libs/requirejs/require',
		'google-code-prettify': 'bower-libs/google-code-prettify/src/prettify',
		highlightjs: 'libs/highlight/highlight.pack',
		'jquery-waitforimages': 'bower-libs/waitForImages/src/jquery.waitforimages',
		// FileSaver: 'bower-libs/FileSaver/FileSaver',
		// stacktrace: 'bower-libs/stacktrace/stacktrace',
		// 'requirejs-text': 'bower-libs/requirejs-text/text',
		// 'bootstrap-tour': 'bower-libs/bootstrap-tour/build/js/bootstrap-tour',
		css_browser_selector: 'bower-libs/css_browser_selector/css_browser_selector',
		'pagedown-extra': 'bower-libs/pagedown-extra/node-pagedown-extra',
		pagedownExtra: 'bower-libs/pagedown-extra/Markdown.Extra',
		pagedown: 'libs/Markdown.Editor',
		// 'require-css': 'bower-libs/require-css/css',
		xregexp: 'bower-libs/xregexp/xregexp-all',
		// yaml: 'bower-libs/yaml.js/bin/yaml',
		// 'yaml.js': 'bower-libs/yaml.js',
		// 'yaml-js': 'bower-libs/yaml.js/bin/yaml',
		css: 'bower-libs/require-css/css',
		// 'css-builder': 'bower-libs/require-css/css-builder',
		normalize: 'bower-libs/require-css/normalize',
		prism: 'bower-libs/prism/prism',
		'prism-core': 'bower-libs/prism/components/prism-core',
		MutationObservers: 'bower-libs/MutationObservers/MutationObserver',
		WeakMap: 'bower-libs/WeakMap/weakmap',
		rangy: 'bower-libs/rangy/rangy-core',
		'rangy-cssclassapplier': 'bower-libs/rangy/rangy-cssclassapplier',
		diff_match_patch: 'bower-libs/google-diff-match-patch-js/diff_match_patch',
		diff_match_patch_uncompressed: 'bower-libs/google-diff-match-patch-js/diff_match_patch_uncompressed',
		jsondiffpatch: 'bower-libs/jsondiffpatch/build/bundle',
		hammerjs: 'bower-libs/hammerjs/hammer',
		Diagram: 'bower-libs/js-sequence-diagrams/src/sequence-diagram',
		'diagram-grammar': 'bower-libs/js-sequence-diagrams/build/diagram-grammar',
		raphael: 'bower-libs/raphael/raphael',
		'flow-chart': 'bower-libs/flowchart/release/flowchart.amd-1.3.4.min',
		flowchart: 'bower-libs/flowchart/release/flowchart-1.3.4.min',
		monetizejs: 'bower-libs/monetizejs/src/monetize',
		waitForImages: 'bower-libs/waitForImages/dist/jquery.waitforimages',
		MathJax: '../libs/MathJax/MathJax'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		mathjax: [
			'libs/mathjax_init'
		],
		jgrowl: {
			deps: [
				
			],
			exports: 'jQuery.jGrowl'
		},
		diff_match_patch_uncompressed: {
			exports: 'diff_match_patch'
		},
		jsondiffpatch: [
			'diff_match_patch_uncompressed'
		],
		rangy: {
			exports: 'rangy'
		},
		'rangy-cssclassapplier': [
			'rangy'
		],
		mousetrap: {
			exports: 'Mousetrap'
		},
		'yaml-js': {
			exports: 'YAML'
		},
		'prism-core': {
			exports: 'Prism'
		},
		'bower-libs/prism/components/prism-markup': [
			'prism-core'
		],
		'libs/prism-latex': [
			'prism-core'
		],
		'libs/prism-markdown': [
			'bower-libs/prism/components/prism-markup',
			'libs/prism-latex'
		],
		// 'bootstrap-record': [
		// 	'mousetrap'
		// ],
		// stacktrace: {
		// 	exports: 'printStackTrace'
		// },
		// FileSaver: {
		// 	exports: 'saveAs'
		// },
		MutationObservers: [
			'WeakMap'
		],
		highlightjs: {
			exports: 'hljs'
		},
		'jquery-waitforimages': [
		],
		pagedown: [
			'libs/Markdown.Converter'
		],
		pagedownExtra: [
			'libs/Markdown.Converter'
		],
		'flow-chart': [
			'raphael'
		],
		'diagram-grammar': [
			'underscore'
		],
		Diagram: [
			'raphael',
			'diagram-grammar'
		]
	}
});

window.viewerMode = false;
// Keep the theme in a global variable
window.theme = 'default';

window.getMsg || (getMsg = function(msg) {
	return msg;
});

// RequireJS entry point. By requiring synchronizer, publisher, sharing and
// media-importer, we are actually loading all the modules
require([
	// "jquery",
	"rangy",
	"core",
	"eventMgr",
	// "synchronizer",
	// "publisher",
	// "sharing",
	// "mediaImporter",
	"css",
	"rangy-cssclassapplier"
	// ,themeModule // 生产模式
], function( rangy, core) {
	if(window.noStart) {
		return;
	}
	$(function() {
		rangy.init();
		// Here, all the modules are loaded and the DOM is ready
		core.onReady();
	});
});
