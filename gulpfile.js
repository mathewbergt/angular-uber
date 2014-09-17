var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('scripts', function() {
  return gulp.src('angular-uber.js').
  			  pipe(gulp.dest('example/scripts'))
			  pipe(rename('angular-uber.min.js')).
			  pipe(uglify({
			      preserveComments: 'some',
			      outSourceMap: true
			  })).
			  pipe(gulp.dest('.'));
});

gulp.task('default', function() {
  gulp.start('scripts');

  gulp.src(testFiles)
    .pipe(karma({
      configFile: 'test/karma.conf.js',
      action: 'watch'
    }));
});