var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var run = require('gulp-run');


gulp.task('react', ['sass'], function () {
    return run('yarn --cwd frontend build').exec();
});

gulp.task('js', ['react'], function () {
    return gulp.src('frontend/build/static/js/*.js')
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('public/assets/js'))
});

gulp.task('css', ['react'], function () {
    return gulp.src([
        'frontend/build/static/css/*.css',
    ])
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('public/assets/css'))
});

gulp.task('sass', function () {
    return gulp.src('frontend/src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('frontend/src'));
});

gulp.task('default', ['react', 'sass', 'js', 'css']);
