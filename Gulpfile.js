/* jshint -W015 */
var gulp = require('gulp');
var util = require('gulp-util');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var requirejs = require('gulp-requirejs');
var bowerRequirejs = require('bower-requirejs');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var inject = require('gulp-inject');
var replace = require('gulp-replace');
var bump = require('gulp-bump');
var childProcess = require('child_process');
var runSequence = require('run-sequence');
var fs = require('fs');


/** __________________________________________
 * constants.js
 */
function getVersion() {
	var packageJson = JSON.parse(fs.readFileSync(__dirname + '/package.json', {
		encoding: 'utf8'
	}));
	return packageJson.version;
}

gulp.task('constants', function() {
	return gulp.src('./public/res/constants.js')
		.pipe(replace(/constants\.VERSION = .*/, 'constants.VERSION = "' + getVersion() + '";'))
		.pipe(gulp.dest('./public/res/'));
});

/** __________________________________________
 * JSHint
 */

gulp.task('jshint', function() {
	return gulp.src([
		'./*.js',
		'./app/**/*.js',
		'./public/res/classes/**/*.js',
		'./public/res/extensions/**/*.js',
		'./public/res/helpers/**/*.js',
		'./public/res/providers/**/*.js',
		'./public/res/*.js'
	])
		.pipe(jshint(".jshintrc"))
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

/** __________________________________________
 * RequireJS
 */

gulp.task('clean-requirejs', function() {
	return gulp.src([
		'./public/res-min/main.js',
		'./public/res-min/require.js'
	])
		.pipe(clean());
});

gulp.task('copy-requirejs', ['clean-requirejs'], function() {
	return gulp.src('./public/res/bower-libs/requirejs/require.js')
		.pipe(gulp.dest('./public/res-min/'));
});

gulp.task('requirejs', [
	// 'copy-requirejs',
	'constants'
], function() {
	return requirejs({
		baseUrl: 'public/res',
		name: 'main',
		out: 'main.js',
		mainConfigFile: 'public/res/main.js',
		// optimize: 'uglify2', // 压缩
		inlineText: true,
		paths: {
			mathjax: 'empty:'
		},
		excludeShallow: [
			'css/css-builder',
			'less/lessc-server',
			'less/lessc'
		]
	})
	/*
	// 压缩先取消
	.pipe(uglify({
		output: {
			beautify: false,
			indent_level: 1
		}
	}))
	*/
	.pipe(gulp.dest('./public/res-min/'));
});

// life
var rename = require('gulp-rename');
gulp.task('minifyIt',function() {
	gulp.src('./public/res-min/main.js')
	.pipe(uglify({
		output: {
			beautify: false,
			indent_level: 1
		}
	}))
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('./public/res-min/'));
});

gulp.task('bower-requirejs', function(cb) {
	bowerRequirejs({
		config: './public/res/main.js'
	}, function() {
		cb();
	});
});

/** __________________________________________
 * Less
 */

gulp.task('clean-less', function() {
	return gulp.src('./public/res-min/themes')
		.pipe(clean());
});

gulp.task('less', ['clean-less'], function() {
	return gulp.src([
		'./css/*.less'
	])
		.pipe(less({
			compress: false
		}))
		.pipe(gulp.dest('./css'));
});

/** __________________________________________
 * Fonts
 */

gulp.task('clean-font', function() {
	return gulp.src('./public/res-min/font')
		.pipe(clean());
});

gulp.task('copy-font', ['clean-font'], function() {
	return gulp.src('./public/res/font/*')
		.pipe(gulp.dest('./public/res-min/font/'));
});

/** __________________________________________
 * Images
 */

gulp.task('clean-img', function() {
	return gulp.src('./public/res-min/img')
		.pipe(clean());
});

gulp.task('copy-img', ['clean-img'], function() {
	return gulp.src('./public/res/img/*')
		.pipe(gulp.dest('./public/res-min/img/'));
});

/** __________________________________________
 * cache.manifest
 */

gulp.task('cache-manifest', function() {
	return gulp.src('./public/cache.manifest')
		.pipe(replace(/(#Date ).*/, '$1' + Date()))
		.pipe(inject(gulp.src([
				'./res-min/**/*.*'
			], {
				read: false,
				cwd: './public'
			}),
			{
				starttag: '# start_inject_resources',
				endtag: '# end_inject_resources',
				ignoreExtensions: true,
				transform: function(filepath) {
					return filepath.substring(1);
				}
			}))
		.pipe(inject(gulp.src([
				'./res/bower-libs/MathJax/MathJax.js',
				'./res/bower-libs/MathJax/config/Safe.js',
				'./res/bower-libs/MathJax/config/TeX-AMS_HTML.js',
				'./res/bower-libs/MathJax/images/CloseX-31.png',
				'./res/bower-libs/MathJax/images/MenuArrow-15.png',
				'./res/bower-libs/MathJax/jax/output/HTML-CSS/jax.js',
				'./res/bower-libs/MathJax/extensions/**/*.*',
				'./res/bower-libs/MathJax/fonts/HTML-CSS/TeX/woff/**/*.*',
				'./res/bower-libs/MathJax/jax/element/**/*.*',
				'./res/bower-libs/MathJax/jax/output/HTML-CSS/autoload/**/*.*',
				'./res/bower-libs/MathJax/jax/output/HTML-CSS/fonts/TeX/**/*.*',
				'./res/bower-libs/MathJax/jax/output/HTML-CSS/fonts/STIX/**/*.*'
			], {
				read: false,
				cwd: './public'
			}),
			{
				starttag: '# start_inject_mathjax',
				endtag: '# end_inject_mathjax',
				ignoreExtensions: true,
				transform: function(filepath) {
					if(filepath == '/res/bower-libs/MathJax/MathJax.js') {
						filepath += '?config=TeX-AMS_HTML';
					}
					else {
						filepath += '?rev=2.4-beta-2';
					}
					return filepath.substring(1);
				}
			}))
		.pipe(gulp.dest('./public/'));
});

gulp.task('clean', [
	'clean-requirejs',
	'clean-less',
	'clean-font',
	'clean-img'
]);
gulp.task('default', function(cb) {
	runSequence([
			// 'jshint',
			'requirejs',
			'less',
			// 'copy-font',
			// 'copy-img'
		],
		'cache-manifest',
		cb);
});

/*
gulp.task('minify', function(cb) {
	runSequence([
		'minifyIt',
		],
		cb);
});
*/

function bumpTask(importance) {
	return function() {
		return gulp.src([
			'./package.json',
			'./bower.json'
		])
			.pipe(bump({type: importance}))
			.pipe(gulp.dest('./'));
	};
}

gulp.task('bump-patch', bumpTask('patch'));
gulp.task('bump-minor', bumpTask('minor'));
gulp.task('bump-major', bumpTask('major'));

function exec(cmd, cb) {
	childProcess.exec(cmd, {cwd: process.cwd()}, function(err, stdout, stderr) {
		if(!err) {
			util.log(stdout, stderr);
		}
		cb(err);
	});
}

gulp.task('git-tag', function(cb) {
	var tag = 'v' + getVersion();
	util.log('Tagging as: ' + util.colors.cyan(tag));
	exec('git add ./public/res-min', function(err) {
		if(err) {
			return cb(err);
		}
		exec('git commit -a -m "Prepare release"', function(err) {
			if(err) {
				return cb(err);
			}
			exec('git tag -a ' + tag + ' -m "Version ' + getVersion() + '"', function(err) {
				if(err) {
					return cb(err);
				}
				exec('git push origin master --tags', cb);
			});
		});
	});
});

function releaseTask(importance) {
	return function(cb) {
		runSequence(
				'bump-' + importance,
			'default',
			'git-tag',
			cb);
	};
}

gulp.task('patch', releaseTask('patch'));
gulp.task('minor', releaseTask('minor'));
gulp.task('major', releaseTask('major'));

//-----------

// for markdown

var markdownRaw = './public';
var markdownMin = './public/leanote-ios';

var concat = require('gulp-concat');
var minifyHtml = require("gulp-minify-html");

// min main.js, 无用
gulp.task('jsmin', function() {
    return gulp
        .src(markdownRaw + '/main.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(markdownMin));
});

// 合并Js
gulp.task('concatJs', function() {
    return gulp
        .src([markdownRaw + '/res-min/jquery.min.js', markdownRaw + '/res-min/before.js', markdownRaw + '/res-min/require.min.js', markdownRaw + '/res-min/main.js', markdownRaw + '/res-min/editor.js'])
        // .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(markdownMin));
});

gulp.task('copyLibs', function() {
    return gulp
        .src(markdownRaw + '/res-min/libs/**/*')
        .pipe(gulp.dest(markdownMin + '/res-min/libs/'));
});

// 合并css
gulp.task('concatCss', function() {
    return gulp
        .src([markdownRaw + '/css/default.css', markdownRaw + '/css/md.css'])
        .pipe(concat('all.css'))
        .pipe(gulp.dest(markdownMin));
});

// 优化html, 替换css, js
gulp.task('htmlMarkdown', function() {
	var sources = gulp.src([markdownMin + '/all.js', markdownMin + '/all.css'], {read: false});

    return gulp
        .src(markdownRaw + '/editor-mobile.html')
        .pipe(replace(/<textarea(\s|\S)+?<\/textarea>/g, ''))
        .pipe(replace(/<div style="display: none">(\s|\S)+?<\/div>/g, '')) // 除去未例
        .pipe(replace(/<link.+?\/>/g, '')) // 除去<link />
        .pipe(replace(/<script.*>.*<\/script>/g, '')) // 除去<script></script>
        .pipe(inject(sources, {relative: true}))
        .pipe(replace(/leanote\-ios\//g, '')) // 是因为inject后, 是相对路径
        .pipe(minifyHtml())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(markdownMin));
});

gulp.task('concatMarkdown', ['concatJs', 'concatCss']);
gulp.task('minify', ['concatMarkdown', 'htmlMarkdown', 'copyLibs']);
