var gulp = require('gulp'),
  jade = require('gulp-jade'),
  connect = require('gulp-connect'),
  open = require('gulp-open'),

  sass = require('gulp-sass'),
  browserify = require('browserify'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  gutil = require('gulp-util'),

  reporter = require('frontend-reporter'),

  require('es6-promise').polyfill(); // for autoprefixer


var conf = {
  jade_path_watch: ['src/templates/*.jade', 'src/templates/**/*.jade'],
  jade_path_from:  'src/templates/*.jade',
  jade_path_dest: './views/',

  sass_path_watch: ['src/styles/*.sass', 'src/styles/**/*.sass'],
  sass_path_from: 'src/styles/*.sass',
  sass_path_dest: 'public/css/',

  js_path_watch: ['src/js/*.sass', 'src/js/**/*.js'],
  js_path_from: 'src/js/*.js',
  js_path_dest: 'public/js/',

  port: 8001
};



gulp.task('connect', function () {
  connect.server({
    port: conf.port,
    root: './views/'
      /*livereload: true*/
  });
});



gulp.task('jade', function () {
  return gulp.src(conf.jade_path_from)
    .pipe(jade({
      pretty: true
    }).on('error', function (err) {
      var displayErr = gutil.colors.red(err);
      gutil.log(displayErr);
      gutil.beep();
      this.emit('end');
    }))
    .pipe(gulp.dest(config.jade_path_dest))
    //.pipe(connect.reload());
});



gulp.task('sass', function () {
  return gulp.src(conf.sass_path_from)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', function (err) {
      var displayErr = gutil.colors.red(err);
      gutil.log(displayErr);
      gutil.beep();
      this.emit('end');
    }))
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.sass_path_dest));
  //.pipe(gulp.dest(conf.sass_path_dest + '/tmp'));
});



gulp.task('scripts', function () {
  // return gulp.src(conf.js_path_from)
  //   .pipe(sourcemaps.init())
  //   .pipe(browserify().on('error', function (err) {
  //     var displayErr = gutil.colors.red(err);
  //     gutil.log(displayErr);
  //     gutil.beep();
  //     this.emit('end');
  //   }))
  //   .pipe(sourcemaps.write('.'))
  //   .pipe(gulp.dest(config.js_path_dest));
  //.pipe(gulp.dest(conf.sass_path_dest + '/tmp'));
});



gulp.task('watch', function () {
  gulp.watch(conf.jade_path_watch, ['jade']);
  gulp.watch(conf.sass_path_watch, ['sass']);
  gulp.watch(conf.js_path_watch, ['scripts']);
});



gulp.task('open', function () {
  gulp.src('')
    .pipe(open({
      app: 'firefox',
      uri: 'http://localhost:' + conf.port
    }));
});

gulp.task('default', ['connect', 'watch', 'open']);
