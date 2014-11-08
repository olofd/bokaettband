/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    htmlmin = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    rev = require('gulp-rev'),
    del = require('del'),
    ngmin = require('gulp-ngmin'),
    ts = require('gulp-typescript'),
    eventStream = require('event-stream'),
    msbuild = require("gulp-msbuild"),
    templateCache = require('gulp-angular-templatecache'),
    spa = require("gulp-spa");



gulp.task("msbuildrun", function () {
    gulp.src("../Bokaettband/WebServer.csproj")
        .pipe(msbuild({
            targets: ['Build'],
            toolsVersion: 4.0,
            properties: {
                DeployOnBuild: true,
                PublishProfile: "BokaEttBand",
                VisualStudioVersion: "12.0",
                Configuration: 'Release'


            },
            maxBuffer: '1000*1024',
            verbosity: 'diagnostic',
            stderr: true,
            stdout: true

        }));
});
gulp.task('runtypescript', function () {
    var tsProject = ts.createProject({
        declarationFiles: true,
        noExternalResolve: true
    });
    var tsResult = gulp.src(['Scripts/typings/**/*.d.ts', 'app/**/*.ts'])
                       .pipe(ts(tsProject));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest('dist/definitions')),
         tsResult.js.pipe(gulp.dest('app'))
    );
});
gulp.task('usemin', function () {
    var min = function () {
        return gulp.src('./index.html')
            .pipe(usemin({
                css: [minifycss(), rev(),'concat'],
                html: [htmlmin({ empty: true })],
                js: [ngmin(), uglify({ mangle: false }),

                    gulp.src('./app/**/*.html')
                           .pipe(htmlmin({
                               quotes: true
                           }))
                           .pipe(templateCache({
                               module: 'app' // has to be the name of angular app
                           })),
                     rev()
                    , 'concat']
            })).pipe(gulp.dest('dist/'));;
    };
    min();
    //var ngtemplates = function () {
    //    return gulp.src('./app/**/*.html')
    //           .pipe(htmlmin({
    //               quotes: true
    //           }))
    //           .pipe(templateCache({
    //               module: 'app' // has to be the name of angular app
    //           }));
    //};
    ////.pipe(gulp.dest('dist/'));


    //eventStream.merge(min(), ngtemplates())
    //    .pipe(rev())



});


//gulp.task("spa", function () {
//    return gulp.src("./index.html")
//        .pipe(spa.html({
//            pipelines: {
//                main: function (files) {
//                    // this gets applied for the HTML file itself
//                    return files.pipe(htmlmin());
//                },

//                js: function (files) {
//                    var angularTemplates = function () {
//                        return gulp.src('./app/**/*.html')
//                            .pipe(htmlmin({
//                                quotes: true
//                            }))
//                            .pipe(templateCache({
//                                module: 'app' // has to be the name of angular app
//                            }));
//                    };
//                    return eventStream.concat(files, angularTemplates())
//                        .pipe(ngmin())
//                        .pipe(uglify({ mangle: false }))
//                        .pipe(concat("app.js"))
//                        .pipe(rev());
//                },

//                css: function (files) {
//                    return files
//                        .pipe(minifycss())
//                        .pipe(concat("app.css"))
//                        .pipe(rev());
//                }
//            }
//        }))
//        .pipe(gulp.dest("./dist/"));
//});



// Clean
gulp.task('clean', function (cb) {
    del(['dist/'], cb);
});
gulp.task('typescript', [], function () {
    gulp.start('runtypescript');
});
// Default task
gulp.task('build', ['clean', 'msbuildrun', 'typescript'], function () {
    gulp.start('usemin');
});


// Watch
//gulp.task('watch', function () {

//    // Watch .scss files
//    gulp.watch('src/styles/**/*.scss', ['styles']);

//    // Watch .js files
//    gulp.watch('src/scripts/**/*.js', ['scripts']);

//    // Watch image files
//    gulp.watch('src/images/**/*', ['images']);

//    // Create LiveReload server
//    livereload.listen();

//    // Watch any files in dist/, reload on change
//    gulp.watch(['dist/**']).on('change', livereload.changed);

//});