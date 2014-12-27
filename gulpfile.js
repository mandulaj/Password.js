var gulp = require('gulp'),
  uglify = require('gulp-uglify'),

  istanbul = require("gulp-istanbul"),
  coveralls = require('gulp-coveralls'),
  mocha = require('gulp-mocha');

var sourcePath = {
  source: 'src/*.js'
};

gulp.task('build', function() {
  return gulp.src(sourcePath.source)
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function(cb) {
  gulp.src(sourcePath.source)
    .pipe(istanbul()) // Covering files
    .on('finish', function() {
      gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests ran
        .on('end', cb);
    });
});

gulp.task('coverage', function() {
  gulp.src("coverage/lcov.info")
    .pipe(coveralls());
});

gulp.task('default', ['build', 'test']);
