var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  mocha = require('gulp-mocha');

var sourcePath = {
  source: 'src/*.js'
};

gulp.task('build', function() {
  return gulp.src(sourcePath.source)
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
  return gulp.src("test/*.js")
    .pipe(mocha());
});

gulp.task('default', ['build', 'test']);
