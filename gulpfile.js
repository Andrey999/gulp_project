  'use strict';

var gulp = require('gulp'),
  csso = require('gulp-csso'),
  sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  browserSync = require('browser-sync').create();


gulp.task('img', function() {
    return gulp.src('app/img/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/img')); // Выгружаем на продакшен
});



//Html
gulp.task('html',function (){
	return gulp.src('app/index.html')
	.pipe(gulp.dest('build'))
	.on('end',browserSync.reload);
});


//Sass
gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.sass')
    .on('error', sass.logError)
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
    .pipe(csso())
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.reload({
    	stream: true
    }));
});

//Libs
gulp.task('script_libs',function (){
	return gulp.src(['node_modules/jquery/dist/jquery.min.js',
	                 'node_modules/slick-carousel/slick/slick.min.js'])
	.pipe(concat('libs.min.js'))
  .pipe(uglify())
	.pipe(gulp.dest('build/js'))
	.on('end',browserSync.reload);
});

//Script
gulp.task('script',function (){
	return gulp.src('app/js/main.js')
	.pipe(gulp.dest('build/js/'))
	.on('end',browserSync.reload);
});


//Brower-sync
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });  
});

//Watch
gulp.task('watch',function () {
    gulp.watch('app/index.html',gulp.series('html'));
    gulp.watch('app/sass/**/*.sass',gulp.series('sass'));
    gulp.watch('app/js/main.js',gulp.series('script'));
})
gulp.task('default',gulp.series (
	gulp.parallel('html','sass','script_libs','script'),
	gulp.parallel('watch','serve')
));

