const gulp = require('gulp');
const imageMin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');


gulp.task('copyHtml', function () {
    gulp.src('assets/*.html')
        .pipe(gulp.dest('public'))
});

gulp.task('imageMin',  function () {
    gulp.src('assets/products/*')
        .pipe(imageMin([],{}))
        .pipe(gulp.dest('public/products'))
});

gulp.task('copyFonts', function () {
    gulp.src(['assets/fonts/*.otf','assets/fonts/*.ttf','assets/fonts/*.woff'])
        .pipe(gulp.dest('public/fonts'))
});

gulp.task('copyData', function () {
    gulp.src('assets/data/*.json')
        .pipe(gulp.dest('public/data'))
});

gulp.task('sass', function () {
    gulp.src(['assets/sass/*.scss','assets/sass/layout/*.scss', 'assets/sass/modules/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'))
});

gulp.task('scripts',  function () {
    gulp.src('assets/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
});

gulp.task('watch', function(){
    gulp.start('default');
    gulp.watch('assets/js/*.js', ['scripts']).on('error', swallowError);;
    gulp.watch('assets/images/*', ['imageMin']).on('error', swallowError);;
    gulp.watch(['assets/sass/*.scss','assets/sass/layout/*.scss', 'assets/sass/modules/*.scss'], ['sass']).on('error', swallowError);;
    gulp.watch('assets/*.html', ['copyHtml']).on('error', swallowError);;
});

function swallowError (error) {
    console.log(error.toString())
  
    this.emit('end')
  }

gulp.task('default', ['copyHtml', 'imageMin', 'sass', 'scripts','copyFonts','copyData']);