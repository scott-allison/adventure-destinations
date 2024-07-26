'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

// Path to files
let dest = {
  css: './dist/css/',
  components: './dist/css/components/',
  js: './dist/js/'
};

// Select all files
let src = {
  css: './dist/css/**/*.css',
  theme: './src/scss/**/*.scss',
  components: './src/components/**/*.scss',
  js: './dist/js/**/*.js'
};

// BrowserSync URL
let localUrl = "#";

// Compile SCSS into CSS
gulp.task('sass', async function () {
  return gulp.src(src.theme)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    //.pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest.css));
});

gulp.task('sass-comp', async function () {
  return gulp.src(src.components)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    //.pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest.css));
});

// Watch SCSS and JS files for changes
gulp.task('watch', async function () {
  gulp.watch(src.components, gulp.series('sass-comp'));
  gulp.watch(src.theme, gulp.series('sass'));
});

// Run Tasks
gulp.task('default', gulp.series('watch'));
