// Load plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    include = require('gulp-include'),
    css = require('css'),
    browserSync = require('browser-sync'),
    browserReload = browserSync.reload,
    child = require('child_process'),
    postcss = require('gulp-postcss'),
    cssvariables = require('postcss-css-variables'),
    atImport = require("postcss-import"),
    customMedia = require("postcss-custom-media"),
    include = require("gulp-include"),
    at2x = require('postcss-at2x'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    transform = require('vinyl-transform'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    runSequence  = require('run-sequence'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
    run = require('gulp-run'),
    clean = require('gulp-clean'),
    cp = require('child_process');

var siteRoot    = '_site';
var cssFiles    = '_src/css/**/*.?(s)css';
var jsFiles     = '_src/js/main.js';
var fontFiles   = '_src/fonts/**/*';
var imagesFiles = '_src/images/**/*';


gulp.task('images', function() {
  return gulp.src(imagesFiles)
    .pipe(gulp.dest('assets/images'))
    .pipe(gulp.dest('_site/assets/images'))
    .pipe(size({showFiles: true}))
    .on('error', gutil.log);
})

gulp.task('fonts', function() {
  return gulp.src(fontFiles)
    .pipe(rename(function(path) {path.dirname = '';}))
    .pipe(gulp.dest('assets/fonts'))
    .pipe(gulp.dest('_site/assets/fonts'))
    .pipe(size({showFiles: true}))
    .on('error', gutil.log);
});

gulp.task('js', () => {
  var bundleStream = browserify(jsFiles).bundle()
  bundleStream
    .pipe(source(jsFiles))
    .pipe(rename('main.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(gulp.dest('_site/assets/js'))
});

gulp.task('css', () => {
  var processors = [
      atImport(),
      customMedia(),
      cssvariables(),
      at2x(),
  ];
  gulp.src(cssFiles)
    .pipe(postcss(processors))
    .pipe(gulp.dest('assets/css'))
    .pipe(gulp.dest('_site/assets/css'))
    .on('error', gutil.log);
});

gulp.task('clean', function() {
  return gulp.src(['css', 'js'], {read: false})
    .pipe(clean());
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify('Building Jekyll');
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        host: "localhost"
    });
});


gulp.task('watch', function() {
  gulp.watch(cssFiles, ['css']);
  gulp.watch('_src/js/**/*', ['js']);
  gulp.watch(imagesFiles, ['images']);
  gulp.watch(fontFiles, ['fonts']);
  gulp.watch(['index.html', '_includes/*.html', '_layouts/*.html', '*.md', '_posts/*'], ['jekyll-rebuild']);
});


gulp.task('default', ['clean'], function() {
    gulp.start('css', 'fonts', 'js', 'images', 'browser-sync', 'watch');
});
