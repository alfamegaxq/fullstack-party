var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');

gulp.task('sass', function () {
    return gulp.src('frontend/src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('frontend/src'));
});

gulp.task('sprites', function () {
    var spriteData = gulp.src('public/ico/*.png').pipe(spritesmith({
        imgName: 'sprites.png',
        cssName: 'sprites.css',
        imgPath: '/assets/sprites/sprites.png',
    }));

    return spriteData.pipe(gulp.dest('frontend/public/assets/sprites'));
});

gulp.task('default', ['sass', 'sprites']);
