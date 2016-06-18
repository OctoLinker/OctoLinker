const gulp = require('gulp');
const gulpif = require('gulp-if');
const webpack = require('webpack-stream');
const jeditor = require('gulp-json-editor');

const webPackConfig = require('./webpack.config.js');
const browserTarget = 'firefox'; // TODO pass flag to gulp

gulp.task('build', () => {
  return gulp.src(webPackConfig.entry.app)
    .pipe(webpack(webPackConfig))
    .pipe(gulp.dest('dist/'));
});

function isManifest(file) {
  return /manifest\.json?$/.test(file.path);
}

function getAdditionalManifestData() {
  try {
    return require(`./assets/manifest.${browserTarget}.json`);
  } catch (err) {
    return {};
  }
}

gulp.task('copyAssets', () => {
  gulp.src(['./assets/*', '!./assets/manifest.*.json'])
  .pipe(gulpif(isManifest, jeditor(getAdditionalManifestData())))
  .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build', 'copyAssets']);
