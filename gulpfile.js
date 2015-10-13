var gulp = require('gulp'),
  gutil = require('gulp-util'),
    webserver = require('gulp-webserver');

// https://github.com/schickling/gulp-webserver
// http://stephenradford.me/gulp-angularjs-and-html5mode/
gulp.task('webserver', function() {
  gulp.src('app/')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: true,
      open: true
    }));
});


gulp.task('default', ['webserver']);
