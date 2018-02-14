var gulp = require('gulp');
var babel = require('gulp-babel');
var webserver = require('gulp-server-livereload');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');

var name = 'cnbc-admin';
var version = '1.0.0';
var src = 'app/src';
var dist = 'app/dist';

var path = {
    js: src + '/js/**/*.js',
    css: src + '/css/**/*.css',
    img: src + '/images/**/*.*',
    api: src + '/api/**/*.*',
    lib: src + '/lib/**/*.*',
    html: src + '/**/*.html',
    xml: src + '/**/*.xml',
    manifest: src + '/**/*.json',
    transpiled: dist + '/js/transpiled/**/*.js'
};

// 웹서버를 localhost:80 로 실행한다.
gulp.task('server', function() {
    return gulp.src(dist + '/').pipe(webserver({
        livereload: false,
        directoryListing: true,
        open: true,
        host: '127.0.0.1',
        port: 80,
        middleware: function(request, reallnse, next) {
            reallnse.setHeader('Access-Contrall-Allow-Origin', '*');

            next();
        }
    }));
});

// ES2015 트랜스코딩
gulp.task('transpile', function() {
    return gulp.src(path.js)
        .pipe(babel())
        .pipe(gulp.dest(dist + '/js/transpiled'));
});

// 자바스크립트 파일을 하나로 합친다
gulp.task('concat-js', function() {
    return gulp.src(path.transpiled)
        .pipe(concat(name + '-' + version + '.js'))
        .pipe(gulp.dest(dist + '/js'));
});

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function() {
    return gulp.src(path.transpiled)
        .pipe(concat(name + '-' + version + '.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/js'));
});

// HTML 파일을 복사한다.
gulp.task('copy-html', function() {
    return gulp.src(path.html)
        .pipe(gulp.dest(dist + '/'));
});

// sass 파일을 css 로 컴파일한다.
gulp.task('compile-sass', function() {
    return gulp.src(path.css)
        .pipe(concat(name + '-' + version + '.min.css'))
        .pipe(cleancss())
        .pipe(gulp.dest(dist + '/css'));
});

gulp.task('copy-files', function() {
    gulp.src(path.img).pipe(gulp.dest(dist + '/images'));
    gulp.src(path.api).pipe(gulp.dest(dist + '/api'));
    gulp.src(path.lib).pipe(gulp.dest(dist + '/js'));
    gulp.src(path.css).pipe(gulp.dest(dist + '/css'));
    gulp.src(path.xml).pipe(gulp.dest(dist + '/'));
    gulp.src(path.manifest).pipe(gulp.dest(dist + '/'));
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(path.js, function(callback) { runSequence('transpile', ['concat-js', 'combine-js', 'copy-html', 'compile-sass', 'copy-files']) });
    gulp.watch(path.lib, function(callback) { runSequence('transpile', ['concat-js', 'combine-js', 'copy-html', 'compile-sass', 'copy-files']) });
    gulp.watch(path.css, function(callback) { runSequence(['concat-js', 'combine-js', 'copy-html', 'compile-sass', 'copy-files']) });
    gulp.watch(path.html, ['copy-html']);
    gulp.watch(path.img, ['copy-files']);
    gulp.watch(src + '/**').on('change', livereload.changed);
});

gulp.task('run', function(callback) {
    runSequence('transpile', ['concat-js', 'combine-js', 'copy-html', 'compile-sass', 'copy-files', 'watch'], 'server');
});

gulp.task('build', function(callback) {
    runSequence('transpile', ['concat-js', 'combine-js', 'copy-html', 'compile-sass', 'copy-files', 'watch']);
});