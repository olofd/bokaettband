/// <vs />
// Generated on 2014-01-08 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);




    // Define the configuration for all the tasks
    grunt.initConfig({
        msbuild: {
            webserver: {
                src: ['../WebServer/WebServer.csproj'],
                options: {
                    projectConfiguration: 'Release',
                    targets: ['Clean', 'Build', 'Clean'],
                    version: 4.0,
                    maxCpuCount: 4,
                    buildParameters: {
                        DeployOnBuild: true,
                        PublishProfile: "BokaEttBand",
                        VisualStudioVersion: "12.0",
                        Configuration: 'Release'
                    },
                    verbosity: 'quiet'
                }
            },

            frontend: {
                src: ['Frontend.csproj'],
                options: {
                    projectConfiguration: 'Release',
                    targets: ['Clean', 'Build'],
                    version: 4.0,
                    maxCpuCount: 4,
                    buildParameters: {
                        VisualStudioVersion: "12.0",
                        Configuration: 'Release'
                    }
                }
            },
            slnclean: {
                src: ['../Bokaettband.sln'],
                options: {
                    projectConfiguration: 'Release',
                    targets: ['Clean'],
                    version: 4.0,
                    maxCpuCount: 4,
                    buildParameters: {
                        VisualStudioVersion: "12.0",
                        Configuration: 'Release'
                    },
                    verbosity: 'quiet'
                }
            },
            slndebugbuild: {
                src: ['../Bokaettband.sln'],
                options: {
                    projectConfiguration: 'Debug',
                    targets: ['Build'],
                    version: 4.0,
                    maxCpuCount: 4,
                    buildParameters: {
                        VisualStudioVersion: "12.0",
                        Configuration: 'Debug'
                    },
                    verbosity: 'quiet'
                }
            }
        },
        typescript: {
            dev: {
                src: ['Scripts/typings/**/*.d.ts', 'app/**/*.ts'],
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    sourceMap: true,
                    declaration: false
                }
            }
        },
        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || './',

            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: [
                    '<%= yeoman.app %>/app/**/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                  '<%= yeoman.app %>/{,*/}*.html',
                  '.tmp/styles/{,*/}*.css',
                  '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },



        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                      '.tmp',
                      '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                      '.tmp',
                      'test',
                      '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
              'Gruntfile.js',
              '<%= yeoman.app %>/app/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            //options: {
            //    "no-write": true
            //},
            dist: {
                files: [{
                    dot: true,
                    src: [
                      '.tmp',
                      '<%= yeoman.dist %>/*',
                      '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: {

                files: [{
                    dot: true,
                    src: [
                      'O:/inetpub/wwwroot/bokaettband.se/*'
                    ]
                }]
            },




        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
            }
        },





        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                      '<%= yeoman.dist %>/scripts/{,*/}*.js',
                      '<%= yeoman.dist %>/styles/{,*/}*.css',
                      '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                      '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: 'app/**/views/*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },
        ngAnnotate: {
            options: {
                // Task-specific options go here.
            },
            dist: {
                files: {
                    '.tmp/concat/scripts/app.js': ['.tmp/concat/scripts/app.js'],
                },
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {

            test: {
                files: [
                    {
                        expand: true,
                        src: ['index.html'],
                        dest: '//juni//bokaettbandse//'
                    }
                ]
            },

            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                                '*.{ico,png,txt}',
                                '.htaccess',
                                '*.html',
                                'views/{,*/}*.html',
                                'app/**/views/*.html',
                                'app/*.html',
                                'images/{,*/}*.{webp}',
                                'fonts/*',
                                'bower_components/bootstrap-material-design/fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            fonts: {
                expand: true,
                cwd: '<%= yeoman.app %>/bower_components/bootstrap-material-design/fonts',
                dest: './dist/fonts/',
                src: '{,*/}*.*'
            }

        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
              'copy:styles'
            ],
            test: [
              'copy:styles'
            ],
            dist: [
              'copy:styles',
               'copy:fonts',
              'imagemin',
              'svgmin'
            ]
        },
        ngtemplates: {
            app: {
                cwd: '<%= yeoman.app %>',
                src: ['app/**/views/*.html', 'app/*.html'],
                dest: '<%= yeoman.dist %>/app.templates.js'
            },
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true, // Only if you don't use comment directives!
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                module: 'app',
                usemin: 'scripts\\app.js' // <~~ This came from the <!-- build:js --> block

            }

        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= yeoman.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
          'clean:server',
          'concurrent:server',
          'autoprefixer',
          'connect:livereload',
          'watch'

        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
      'clean:server',
      'concurrent:test',
      'autoprefixer',
      'connect:test',
      'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'msbuild:slnclean',
        'typescript:dev',
        'msbuild:webserver',
        'msbuild:slnclean',
        'msbuild:slndebugbuild',
        'typescript:dev',
        'useminPrepare',
        'ngtemplates',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate:dist',
        'copy:dist',
        'copy:fonts',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin',
        'clean:server'

    ]);
    //grunt.registerTask('jshint', [
    //  'jshint'
    //]);
    grunt.registerTask('default', [
      'newer:jshint',
      'test',
      'build'
    ]);
};
