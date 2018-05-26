var gulp = require("gulp");

var server = require("gulp-webserver");

var sass = require("gulp-sass");

var autoprefixer = require("gulp-autoprefixer");

var minCss = require("gulp-clean-css");

var sequence = require("gulp-sequence");

var mock = require("./mock");

var querystring = require("querystring");

var uglify = require("gulp-uglify");

var rev = require("gulp-rev");

var revCollector = require("gulp-rev-collector");

var userInfo = [{
    username: 'lixd',
    pwd: '123456',
    isLogin: false
}]

gulp.task("devCss", function() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(gulp.dest("src/css"))
})



gulp.task("server", function() {
    gulp.src("build")
        .pipe(server({
            port: 9292,
            middleware: function(req, res, next) {

                if (req.url === '/login') {
                    var chunkArr = [];
                    req.on("data", function(chunk) {
                        chunkArr.push(chunk)
                    })
                    req.on("end", function() {
                        var params = querystring.parse(Buffer.concat(chunkArr).toString());
                        var mask = false;
                        userInfo.forEach(function(item, index) {
                            if (item.username === params.username && item.pwd === params.pwd) {
                                mask = true;
                                item.isLogin = true;
                                res.end(JSON.stringify({ code: 1, msg: '登录成功' }));
                            }
                        })
                        if (!mask) {
                            res.end(JSON.stringify({ code: 0, msg: '用户和密码有吴，请重新输入' }));
                        }
                        next()
                    })
                    return false
                } else if (req.url === '/isLogin') {
                    var chunkArr = [];
                    req.on("data", function(chunk) {
                        chunkArr.push(chunk)
                    })
                    req.on("end", function() {
                        var params = querystring.parse(Buffer.concat(chunkArr).toString());
                        var mask = false;
                        userInfo.forEach(function(item, index) {
                            if (item.username === params.username) {
                                mask = true;
                                res.end(JSON.stringify({ code: 1, result: item.isLogin }));
                            }
                        })
                        if (!mask) {
                            res.end(JSON.stringify({ code: 2, msg: '未登录' }))
                        }
                        next()
                    })
                    return false
                }
                if (/\/api/g.test(req.url)) {
                    var url = decodeURI(req.url);
                    var data = mock(url);

                    res.end(JSON.stringify(data));

                }
                next()
            }
        }))
})

gulp.task("watch", function() {
    gulp.watch("src/scss/**/*.scss", ["devCss"])
})

gulp.task("default", function(cb) {
    sequence('devCss', 'server', 'watch', cb)
})

//打包

gulp.task("buildCss", function() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(rev())
        .pipe(gulp.dest("build/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("build/rev/css"))
})

gulp.task("copyHtml", function() {
    return gulp.src(["build/rev/css/*.json", "src/**/*.html"])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest("build"))
})


gulp.task("copyImg", function() {
    return gulp.src("src/imgs/*")
        .pipe(gulp.dest("build/imgs"))
})

gulp.task("copyOwnJs", function() {
    return gulp.src("src/js/{common,app}/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
})

gulp.task("copyLibsJs", function() {
    return gulp.src(["src/js/**/*.js", "!src/js/{common,app}/*.js"])
        .pipe(gulp.dest("build/js"))
})

gulp.task("build", function(cb) {
    sequence('buildCss', 'copyHtml', 'copyImg', 'copyOwnJs', 'copyLibsJs', 'server', cb)
})