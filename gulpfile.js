var gulp = require('gulp'),
  uglify = require('gulp-uglify');

var sourcePath = {
  source: 'src/*.js'
}

gulp.task('build', function(){
  return gulp.src(sourcePath.source)
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
})

gulp.task('default', ['build'])
