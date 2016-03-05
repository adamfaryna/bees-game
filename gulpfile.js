'use strict';

var gulp              = require('gulp');
var browserSync       = require('browser-sync').create();
var $                 = require('gulp-load-plugins')();
var babelify          = require('babelify');
var browserify        = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer       = require('vinyl-buffer');
var vinylPaths        = require('vinyl-paths');
var del               = require('del');
var runSequence       = require('run-sequence');

var src = {
  scripts: {
    app: 'src/app/app.es6'
  }
};

var out = {
  scripts: {
    file: 'app.min.js',
    sourcemap: './',
    folder: 'public/app/'
  }
};

gulp.task('lint', () => {
  return gulp.src(['src/app/**/*.es6', 'test/**/*.es6', 'gulpfile.js', 'karma.conf.js', '!/**/jquery.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('clean', () => {
  return gulp.src(['public/app', 'public/images', 'public/css', 'public/index.html'], { read: false })
    .pipe(vinylPaths(del));
});

// Compile less into CSS & auto-inject into browsers
gulp.task('less', () => {
  return gulp.src('less/*.less')
    .pipe($.less())
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', ['lint'], () => {

  return browserify({
      entries: src.scripts.app,
      paths: ['./src/app'],
      debug: true,
      extensions: ['.es6', '.js']
    })
    //.add(require.resolve('babel/polyfill'))
    .transform(babelify.configure({
      presets: ['es2015', 'react'],
      plugins: ['transform-runtime']}))
    .bundle()
    .pipe(vinylSourceStream(out.scripts.file))
    .pipe(vinylBuffer())
    .pipe($.sourcemaps.init({
      loadMaps: true // Load the sourcemaps browserify already generated
    }))
    .pipe($.ngAnnotate({ single_quotes: true }))
    .pipe($.sourcemaps.write(out.scripts.sourcemap, {
      includeContent: true
    }))
    .pipe(gulp.dest(out.scripts.folder))
    .pipe(browserSync.stream());


  //return gulp.src('src/**/*.es6', { base: 'src' })
  //  .pipe($.babel())
  //  .pipe(gulp.dest('./public/'))
  //  .pipe(browserSync.stream());
});

//gulp.task('babelTest', () => {
//  return gulp.src('test/**/*.es6', { base: 'babel/test' })
//    .pipe(gulp.dest('./test/'));
//});

gulp.task('inject', ['copyPartials'], () => {
  var inject_res = gulp.src(['./public/app/**/*.js', './public/css/**/*.css'], {read: false});

  return gulp.src('./public/index.html')
    .pipe($.inject(inject_res, { addRootSlash: false, read: false, relative: true }))
    .pipe($.wiredep({
      src: './public/index.html',
      directory: './public/bower_components'
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('copyPartials', () => {
  return gulp.src(['./src/**/*.html', './src/images/**/*.*'], { base: 'src' })
    .pipe(gulp.dest('./public/'));
});

// Static Server + watching files
gulp.task('serve', () => {
  runSequence('clean', ['less', 'scripts'], 'inject', () => {
    browserSync.init({
      browser: ['google chrome'],
      server: 'public/',
      port: '3000'
    });

    gulp.watch('./less/*.less', ['less']);
    gulp.watch('./src/**/*.es6', ['scripts']);
    gulp.watch('./src/**/*.html', ['copyPartials']);
    gulp.watch(['./public/**/*.*', '!./public/bower_components']).on('change', browserSync.reload);
  });
});

gulp.task('default', ['serve']);
