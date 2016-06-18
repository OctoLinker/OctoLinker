/* eslint no-console: 0 */

const gulp = require('gulp');
const gulpif = require('gulp-if');
const webpack = require('webpack-stream');
const jeditor = require('gulp-json-editor');
const util = require('gulp-util');
const del = require('del');
const plumber = require('gulp-plumber');
const zip = require('gulp-zip');
const runSequence = require('run-sequence');

const webPackConfig = require('./webpack.config.js');
const version = require('./assets/manifest.json').version;

const browserTarget = util.env.target || 'chrome';
const prodVars = {
  'process.env': {
    'NODE_ENV': JSON.stringify('production'),
  },
};

console.log(`Current build target is ${browserTarget}.
To change the build target use the following command:

npm run <command> -- --target=firefox
`);

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

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('copyAssets', () => {
  return gulp.src(['assets/*', '!assets/manifest.*.json'])
    .pipe(gulpif(isManifest, jeditor(getAdditionalManifestData())))
    .pipe(gulp.dest('dist'));
});

gulp.task('pack', () => {
  return gulp.src('dist/*')
		.pipe(zip(`octolinker-${browserTarget}-${version}.zip`))
		.pipe(gulp.dest('out'));
});

gulp.task('build', () => {
  webPackConfig.debug = true;
  webPackConfig.devtool = 'source-map';

  return gulp.src(webPackConfig.entry.app)
    .pipe(webpack(webPackConfig))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build:watch', () => {
  webPackConfig.debug = true;
  webPackConfig.devtool = 'source-map';
  webPackConfig.watch = true;

  return gulp.src(webPackConfig.entry.app)
    .pipe(plumber())
    .pipe(webpack(webPackConfig))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build:dist', () => {
  webPackConfig.plugins = (webPackConfig.plugins || []).concat(
		new webpack.webpack.DefinePlugin(prodVars),
		new webpack.webpack.optimize.DedupePlugin(),
		new webpack.webpack.optimize.UglifyJsPlugin()
	);

  return gulp.src(webPackConfig.entry.app)
    .pipe(webpack(webPackConfig))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', () => runSequence('clean', 'copyAssets', 'build'));
gulp.task('watch', () => runSequence('clean', 'copyAssets', 'build:watch'));
gulp.task('dist', () => runSequence('clean', 'copyAssets', 'build:dist', 'pack'));
