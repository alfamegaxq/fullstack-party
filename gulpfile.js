var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js', function(){
    return gulp.src('frontend/build/static/js/*.js')
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('public/assets/js'))
});

gulp.task('default', [ 'js' ]);
