/**
 * Created by msimu on 17.01.17..
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var paths = {
    CSS_SRC: './assets/scss/**/*.scss',
    CSS_MAIN: './assets/scss/style.scss',
    CSS_BUILD: './public/css/',
    JS_SRC: './src/**/*.js',
    JS_MAIN: './index.js',
    JS_BUILD: './public/js/'
};

// sass compile
gulp.task('styles', function () {
    gulp.src(paths.CSS_MAIN)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.CSS_BUILD));
});

// js task. Browserify and compile
gulp.task('js', function () {
    browserify(paths.JS_MAIN)
        .transform(babelify, {presets: ['es2015']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.JS_BUILD));
});

// watch for changes
gulp.task('watch', function () {
    gulp.watch([paths.CSS_MAIN, paths.CSS_SRC], ['styles']);
    gulp.watch([paths.JS_MAIN, paths.CSS_SRC], ['js']);
});

// default task (runs when 'gulp' is called)
gulp.task('default', ['watch', 'styles', 'js']);

// build assets
gulp.task('build', ['styles', 'js']);
