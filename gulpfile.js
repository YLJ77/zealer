//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),//加载gulp工具
    sass = require('gulp-sass'),//加载SASS插件
    //connect = require('gulp-connect'),//启动一个服务器
    autoprefixer = require('gulp-autoprefixer');
    browserSync = require('browser-sync').create();
    reload = browserSync.reload;

//定义一个testLess任务（自定义任务名称）

//使用connect启动一个Web服务器
/*
gulp.task('connect', function () {
  connect.server({
    root: 'www',
    port: 7777,
    livereload: true
  });
});
*/
// Styles
gulp.task('sass', function() {
  //编译less
    return gulp.src('./www/css/*.scss')//该任务针对的文件
    .pipe(sass())//该任务调用的模块
    //保存未压缩文件到我们指定的目录下面
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(gulp.dest('./www/css'))//将会在./www/css下生成index.css
    //.pipe(connect.reload())
    .pipe(reload({stream: true}));

});

gulp.task('autoprefixer',function(){
  gulp.src('./www/css/*.css')
    .pipe(autoprefixer({
      browsers: ['>1%'],
      cascade: false,  //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove: false  //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(gulp.dest('./www/css'))
    //.pipe(connect.reload())
});
/*
gulp-autoprefixer的browsers参数详解：
    last 2 versions: 主流浏览器的最新两个版本
    last 1 Chrome versions: 谷歌浏览器的最新版本
    last 2 Explorer versions: IE的最新两个版本
    last 3 Safari versions: 苹果浏览器最新三个版本
    Firefox >= 20: 火狐浏览器的版本大于或等于20
    iOS 7: IOS7版本
    Firefox ESR: 最新ESR版本的火狐
    > 5%: 全球统计有超过5%的使用率
各浏览器的标识：
    Android for Android WebView.
    BlackBerry or bb for Blackberry browser.
    Chrome for Google Chrome.
    Firefox or ff for Mozilla Firefox.
    Explorer or ie for Internet Explorer.
    iOS or ios_saf for iOS Safari.
    Opera for Opera.
    Safari for desktop Safari.
    OperaMobile or op_mob for Opera Mobile.
    OperaMini or op_mini for Opera Mini.
    ChromeAndroid or and_chr
    FirefoxAndroid or and_ff for Firefox for Android.
    ExplorerMobile or ie_mob for Internet Explorer Mobile.
*/


gulp.task('browser-sync',['sass'],function(){

  browserSync.init({
      //代理
      //proxy: "localhost:7777"
      //静态服务器
      
      server:{
        baseDir:"./www"
      }
      
  });
  

  gulp.watch(['./www/css/*.scss'],['sass']);
  gulp.watch('./www/*.html').on('change',reload);
});


gulp.task('default', ['browser-sync']);//定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径