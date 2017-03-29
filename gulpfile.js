const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');

gulp.task('sass', function () {
  return gulp.src('./scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
     .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('./compiled/css/'));
});

gulp.task('compile', function () {
  return gulp.src('./compile/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(gulp.dest('./compile/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('concat-js', function() {

  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/flexslider/jquery.flexslider-min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/sidr/dist/jquery.sidr.min.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('concat-css', function() {
   return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'public/css/base.css',
    'node_modules/flexslider/flexslider.css',
    'node_modules/sidr/dist/stylesheets/jquery.sidr.bare.css',
    'node_modules/sidr/dist/stylesheets/jquery.sidr.light.css'
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/css/'));
});