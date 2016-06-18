const gulp = require('gulp');
const webpack = require('webpack-stream');

const webPackConfig = require('./webpack.config.js');

gulp.task('build', () => {
  return gulp.src(webPackConfig.entry.app)
    .pipe(webpack(webPackConfig))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copyAssets', () => {
  gulp.src(['./assets/*'])
  .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build', 'copyAssets']);
