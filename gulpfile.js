var gulp 		= require('gulp'),
    browserSync = require('browser-sync'),
    sass 		= require('gulp-sass'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    // rename      = require('gulp-rename'),
    del         = require('del'),
    autoprefixer= require('gulp-autoprefixer'),
    htmlmin     = require('gulp-htmlmin'),
    // ignore      = require('gulp-ignore'),
    imagemin 	= require('gulp-imagemin'),
    jade        = require('gulp-jade');

gulp.task('sass', function(){
	return gulp.src('app/scss/main.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('jadeh', function() {
  gulp.src('./app/jade/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./app'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir : 'app'
        },
        notify: false
    })
});


gulp.task('watch', ['browser-sync','jadeh', 'sass'], function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/jade/**/*.jade', ['jadeh']);
    gulp.watch('app/index.html', browserSync.reload); 
    gulp.watch('app/*.сss', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});


// gulp.task('scripts', function() {
//     return gulp.src([ // Take all libraries

//         ])
//         .pipe(concat('libs.min.js')) // Concat in a new file libs.min.js
//         .pipe(uglify()) // Compress
//         .pipe(gulp.dest('app/js')); // Dest in app/js
// });


// gulp.task('css-libs', function() {
//     return gulp.src([ // Take all the css files and minify

//      ]) 
//      .pipe(concat('libs.min.css')) // Concat the new file libs.min.css
//         .pipe(cssnano()) // Compress
//         .pipe(gulp.dest('app/css')); // Dest in app/css
// });

// gulp.task('css-files', function() {
//     return gulp.src([ // Take all the css files and minify

//         ])
//         .pipe(concat('style.min.css')) // Concat the new file libs.min.css
//         .pipe(cssnano()) // Compress
//         .pipe(gulp.dest('app/css')); // Dest in app/css
// });


gulp.task('clean', function() {
    return del.sync('dist'); // Delete folder dist before build
});

gulp.task('build', ["clean", "sass"], function() {

    var buildCss = gulp.src('app/css/**/*') // Dest css in production
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))

    // var buildFonts = gulp.src('app/fonts/**/*') // Dest fonts in production
    // .pipe(gulp.dest('dist/fonts'))

    // var buildFonts = gulp.src('app/php/**/*') // Dest php in production
    // .pipe(gulp.dest('dist/php'))

    // var buildLanguage = gulp.src('app/ru/**/*')
    // .pipe(htmlmin({collapseWhitespace: true}))
    // .pipe(gulp.dest('dist/ru'))
    
    var buildImage = gulp.src('app/img/**/*') // Dest img in production
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))

    var buildJs = gulp.src('app/js/**/*') // Dest js in production
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Dest HTML in production
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));

});