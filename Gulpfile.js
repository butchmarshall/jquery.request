var fs = require('fs'),
concat = require('gulp-concat'),
rename = require('gulp-rename'),
umd = require('gulp-umd'),
uglify = require('gulp-uglify'),
gulp = require('gulp');

gulp.task('default', [
  'minify'
]);

gulp.task('watch', function() {
	gulp.watch('./src/**/*', ['default']);
});

gulp.task('minify', function() {
	gulp.src([
		'./src/*.js'
	])
	.pipe(concat('jquery.request.js'))
	.pipe(umd({
		dependencies: function() {
			return [
				{
					name: 'jQuery',
					cjs: 'jquery',
					amd: 'jquery',
					global: 'jQuery'
				},
				{
					name: 'jquery-data-to-json',
					cjs: 'jquery.dataToJson',
					amd: 'jquery.dataToJson',
					param: 'dataToJson',
					global: 'jQuery.dataToJson'
				},
				{
					name: 'jquery-data-to-inputs',
					cjs: 'jquery.dataToInputs',
					amd: 'jquery.dataToInputs',
					param: 'dataToInputs',
					global: 'jQuery.dataToInputs'
				}
			]
		},
		exports: function() {
			return 'jQuery.Request';
		},
		namespace: function() {
			return 'jQuery.Request';
		}
	}))
	.pipe(gulp.dest('./dist/'))
	.pipe(uglify())
	.pipe(rename('jquery.request.min.js'))
	.pipe(gulp.dest('./dist/'));
});