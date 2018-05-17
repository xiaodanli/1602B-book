var gulp = require("gulp");

var server = require("gulp-webserver");

var sass = require("gulp-sass");

var autoprefixer = require("gulp-autoprefixer");

var minCss = require("gulp-clean-css");

var sequence = require("gulp-sequence");

var mock = require("./mock");

gulp.task("css", function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(gulp.dest("src/css"))
})

gulp.task("server", function() {
    gulp.src("src")
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                if (/\/api/g.test(req.url)) {
                    var data = mock(req.url);
                    res.end(JSON.stringify(data))
                }
                next()
            }
        }))
})

gulp.task("watch", function() {
    gulp.watch("src/scss/*.scss", ["css"])
})

gulp.task("default", function(cb) {
    sequence('css', 'server', 'watch', cb)
})