var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var plugins     = require('gulp-load-plugins')();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

   browserSync.init({
      server: {
         baseDir: "./"
      }
   });

   gulp.watch("scss/*.scss", ['sass']);
   gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
   return gulp.src("scss/*.scss")
   .pipe(sass())
   .on('error', sass.logError) // Show error
   .pipe(plugins.csscomb())
   .pipe(plugins.cssbeautify({indent: '  '}))
   .pipe(gulp.dest("css"))
   .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
