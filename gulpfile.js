const gulp   = require('gulp');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');

gulp.task('lint', () => {
  return gulp.src(['./public/js/*.js','./*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
