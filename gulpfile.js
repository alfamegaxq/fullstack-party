var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var run = require('gulp-run');
var autoprefixer = require('gulp-autoprefixer');
var bust = require('gulp-buster');
var spritesmith = require('gulp.spritesmith');

gulp.task('react', ['sass'], function () {
    return run('yarn --cwd frontend build').exec();
});

gulp.task('js', ['react'], function () {
    return gulp.src('frontend/build/static/js/*.js')
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('public/assets/js'))
        .pipe(bust())
        .pipe(gulp.dest('.'));
});

gulp.task('css', ['react', 'sprites'], function () {
    return gulp.src([
        'frontend/build/static/css/*.css',
        'public/sprites/sprites.css',
    ])
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('public/assets/css'))
        .pipe(bust())
        .pipe(gulp.dest('.'));
});

gulp.task('sass', function () {
    return gulp.src('frontend/src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('frontend/src'));
});

gulp.task('sprites', function () {
    var spriteData = gulp.src('public/ico/*.png').pipe(spritesmith({
        imgName: 'sprites.png',
        cssName: 'sprites.css',
        imgPath: '/sprites/sprites.png',
    }));

    return spriteData.pipe(gulp.dest('public/sprites'));
});

gulp.task('default', ['react', 'sass', 'js', 'css']);
