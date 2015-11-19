define([
	// "jquery",
	"underscore",
	"utils",
	"mousetrap",
	"classes/Extension"
], function(_, utils, mousetrap, Extension, shortcutsDefaultMapping) {
	var shortcuts = new Extension("shortcuts", "Shortcuts", true, true);
	shortcuts.defaultConfig = {
	};

	var eventMgr;
	var pagedownEditor;
	shortcuts.onEventMgrCreated = function(eventMgrParameter) {
		eventMgr = eventMgrParameter;
		eventMgr.addListener('onPagedownConfigure', function(pagedownEditorParam) {
			pagedownEditor = pagedownEditorParam;
		});
	};

	/*jshint unused:false */
	function bindPagedownButton(buttonName) {
		return function(evt) {
			pagedownEditor.uiManager.doClick(pagedownEditor.uiManager.buttons[buttonName]);
			evt.preventDefault();
		};
	}

	function expand(text, replacement) {
		utils.defer(function() {
			require('editor').replacePreviousText(text, replacement);
		});
	}

	/*
    'mod+b': bindPagedownButton('bold'),
    'mod+i': bindPagedownButton('italic'),
    'mod+l': bindPagedownButton('link'),
    'mod+q': bindPagedownButton('quote'),
    'mod+k': bindPagedownButton('code'),
    'mod+g': bindPagedownButton('image'),
    'mod+o': bindPagedownButton('olist'),
    'mod+u': bindPagedownButton('ulist'),
    'mod+h': bindPagedownButton('heading'),
    'mod+r': bindPagedownButton('hr'),
    'mod+z': bindPagedownButton('undo'),
    'mod+y': bindPagedownButton('redo'),
    'mod+shift+z': bindPagedownButton('redo'),
    'mod+m': function(evt) {
        $('.button-open-discussion').click();
        evt.preventDefault();
    },
    '= = > space': function() {
        expand('==> ', '⇒ ');
    },
    '< = = space': function() {
        expand('<== ', '⇐ ');
    },
    'S t a c k E d i t': function() {
        eventMgr.onMessage("You are stunned!!! Aren't you?");
    }
	*/
	/*jshint unused:true */
	shortcuts.onInit = function() {
		try {
			// http://craig.is/killing/mice
			// 只在输入框下有效, life
			// http://stackoverflow.com/questions/16169645/using-mousetrap-on-a-specific-element
			var input = $('.editor-content');
			mousetrap.stopCallback = function(e, element, combo) {
				return element !== input[0];
			};

			var shortcutMap;
            var shortcutMap = {
                    'mod+b': bindPagedownButton('bold'),
                    'mod+i': bindPagedownButton('italic'),
                    'mod+l': bindPagedownButton('link'),
                    'mod+q': bindPagedownButton('quote'),
                    'mod+k': bindPagedownButton('code'),
                    'mod+g': bindPagedownButton('image'),
                    'mod+o': bindPagedownButton('olist'),
                    'mod+u': bindPagedownButton('ulist'),
                    'mod+h': bindPagedownButton('heading'),
                    'mod+r': bindPagedownButton('hr'),
                    'mod+z': bindPagedownButton('undo'),
                    'mod+y': bindPagedownButton('redo'),
                    'mod+shift+z': bindPagedownButton('redo'),
                    'mod+m': function(evt) {
                        $('.button-open-discussion').click();
                        evt.preventDefault();
                    },
                    '= = > space': function() {
                        expand('==> ', '⇒ ');
                    },
                    '< = = space': function() {
                        expand('<== ', '⇐ ');
                    },
                    'S t a c k E d i t': function() {
                        eventMgr.onMessage("You are stunned!!! Aren't you?");
                    }
                };
			_.each(shortcutMap, function(func, shortcut) {
				mousetrap.bind(shortcut, func);
			});
		}
		catch(e) {
			console.error(e);
		}
	};

	shortcuts.onReady = function() {
	};

	return shortcuts;
});
