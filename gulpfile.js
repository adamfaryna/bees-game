'use strict';

var gulp              = require('gulp');
var browserSync       = require('browser-sync').create();
var $                 = require('gulp-load-plugins')();
var babelify          = require('babelify');
var browserify        = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer       = require('vinyl-buffer');

var src = {
  scripts: {
    app: 'src/app/**/*.js'
  }
};

var out = {
  scripts: {
    file: 'public/app/app.min.js',
    folder: 'public/app/'
  }
};

gulp.task('lint', () => {
  return gulp.src(['public/app/**/*.js', 'test/**/*.js', 'gulpfile.js', 'karma.conf.js', '!/**/jquery.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
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

gulp.task('script', ['lint'], () => {
  var sources = browserify({
    entries: src.scripts.app,
    debug: true // Build source maps
  }).transform(babelify.configure({
    // You can configure babel here!
    // https://babeljs.io/docs/usage/options/
  }));

  return sources.bundle()
    .pipe(vinylSourceStream(out.scripts.file))
    .pipe(vinylBuffer())
    .pipe($.sourcemaps.init({
      loadMaps: true // Load the sourcemaps browserify already generated
    }))
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./', {
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

gulp.task('inject', () => {
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
gulp.task('serve', ['less', 'babel', 'copyPartials', 'inject'], () => { // 'lint'
  browserSync.init({
    browser: ['google chrome'],
    server: 'public/',
    port: '3000'
  });

  gulp.watch('./less/*.less', ['less']);
  gulp.watch('./src/**/*.es6', ['babel']);
  gulp.watch('./src/**/*.html', ['copyPartials']);
  gulp.watch(['./public/**/*.*', '!./public/bower_components']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
