'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
gulp.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

require('require-dir')('./gulp');

gulp.task('build', ['clean'], function () {
    gulp.start('build');
});
