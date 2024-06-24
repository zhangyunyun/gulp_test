var gulp = require("gulp");

var $ = require("gulp-load-plugins")(); //$接收的“gulp-load-plugins” 是一个函数,需要调用函数
//引入这个后面注释的插件模块可以不用引入
// var concat = require("gulp-concat");
// var uglify = require("gulp-uglify");
// var rename = require("gulp-rename");
// var sass = require("gulp-sass");
// var cleanCss = require("gulp-clean-css");
var imagesMin = require("gulp-imagemin");
// var htmlMin = require("gulp-htmlmin");

// var livereload = require("gulp-livereload"); //实时刷新
// var connect = require("gulp-connect"); //实时加载

//var open = require('open');

//测试gulp
/* gulp.task('test',function(){
    console.log('aaaaaaaaa')
}); */

//定义合并压缩js的任务
gulp.task("js", function () {
  /*
        **深度遍历
        找到目标源文件,将数据读取到gulp的内存中
    */
  return (
    gulp
      .src("src/js/**/*.js") //找到目标原文件，将数据读取到gulp的内存中
      .pipe($.concat("build.js")) //合并文件
      //.pipe(gulp.dest('dist/js/'))  //临时输出文件到本地
      //.pipe($.uglify())  //压缩文件
      //.pipe($.rename({suffix:'.min'})) //重命名
      .pipe(gulp.dest("dist/js/"))
      .pipe($.livereload()) //实时刷新
      .pipe($.connect.reload())
  ); //实时加载
});

// 定义编译scss为css任务
gulp.task("sass", function () {
  return gulp
    .src("src/sass/**/*.scss")
    .pipe($.sass())
    .pipe(gulp.dest("src/css/"))
    .pipe($.livereload()) //实时刷新
    .pipe($.connect.reload()); //实时加载
});

//定义合并压缩css任务
gulp.task("css", ["sass"], function () {
  return (
    gulp
      .src("src/css/**/*.css")
      .pipe($.concat("build.css")) // 合并css文件
      // .pipe(gulp.dest('dist/css/')) //临时输出文件到本地
      //.pipe(uglify()) //压缩文件
      //.pipe(rename({suffix:'.min'}))
      //.pipe($.cleanCss({compatibility:'ie8'}))
      .pipe(gulp.dest("dist/css/"))
      .pipe($.livereload()) //实时刷新
      .pipe($.connect.reload())
  ); //实时加载
});

//定义压缩images任务
gulp.task("images", function () {
  return gulp
    .src("src/images/*.*")
    .pipe(imagesMin({ progressive: true }))
    .pipe(gulp.dest("dist/images/"))
    .pipe($.livereload()) //实时刷新
    .pipe($.connect.reload()); //实时加载
});

//定义压缩html任务
gulp.task("html", function () {
  return (
    gulp
      .src("src/*.html")
      //.pipe($.htmlmin({collapseWhitespace:true}))
      .pipe(gulp.dest("dist/"))
      .pipe($.livereload()) //实时刷新
      .pipe($.connect.reload())
  ); //实时加载
});

//定义监视任务(半自动)
gulp.task("watch", ["default"], function () {
  //这里的watch，是自定义的，携程live或者别的也行
  //开启监听
  livereload.listen(); //这里需要注意！旧版使用var server = livereload();已经失效

  //确认监听的目标及绑定相应的任务
  gulp.watch("src/js/*.js", ["js"]);
  gulp.watch(["src/css/*.css", "src/sass/*.scss"], ["css"]);
  gulp.watch(["src/images/"], ["images"]);
  gulp.watch(["src/*.html"], ["html"]);
});

//定义监视任务(全自动)
gulp.task("server", ["default"], function () {
  //配置服务器的选项
  $.connect.server({
    root: "dist/", //提供服务的根路径
    livereload: true, //实时刷新
    port: 5500, //端口号
  });

  //open可以自动打开指定的链接
  //open('http://localhost:5500/')

  // 确认监听的目标及绑定相应的任务
  gulp.watch("src/js/*.js", ["js"]);
  gulp.watch(["src/css/*.css", "src/sass/*.scss"], ["css"]);
  gulp.watch(["src/images/"], ["images"]);
  gulp.watch(["src/*.html"], ["html"]);
});

//默认注册任务
gulp.task("default", ["js", "sass", "css", "html", "images"]);
