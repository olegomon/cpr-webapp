module.exports = function (grunt, options) {

    var browsers = {
        'phantom': 'PhantomJS',
        'chrome' : 'Chrome',
        'firefox': 'Firefox',
        'safar'  : 'Safari',
        'ie'     : 'IE',
        'default': 'PhantomJS'
    };
    var option = grunt.option('browser');
    var browser = option in browsers ? browsers[option] : browsers['default'];

    return {

        options: {
            autoWatch : false,
            background: true,
            frameworks: [ 'jasmine' ],
            reporters : [ 'progress' ],
            plugins   : [
                'karma-jasmine',
                'karma-ie-launcher',
                'karma-chrome-launcher',
                'karma-safari-launcher',
                'karma-firefox-launcher',
                'karma-phantomjs-launcher'
            ],
            logLevel  : 'INFO', // 'OFF', 'ERROR', 'WARN', 'INFO', 'DEBUG',
            files     : [
                '<%= config.files.vendor.js %>',
                '<%= config.files.vendor.spec %>',
                '<%= config.files.app.jsAll %>',
                '<%= html2js.build.dest %>'
            ]
        },

        dev: {
            browsers: [ browser ]
        },

        test: {
            singleRun : true,
            background: false,
            browsers  : [ browser ]
        },

//        ie: {
//            browsers: [ 'IE' ]
//        },
//
//        chrome: {
//            browsers: [ 'Chrome' ]
//        },
//
//        firefox: {
//            browsers: [ 'Firefox' ]
//        },
//
//        safari: {
//            browsers: [ 'Safari' ]
//        },
//
//        phantom: {
//            browsers: [ 'PhantomJS' ]
//        },

        coverage: {
            singleRun       : true,
            background      : false,
            colors          : false,
            reporters       : [ 'dots', 'coverage', 'html' ],
            browsers        : [ 'PhantomJS' ],
            plugins         : [
                'karma-jasmine',
                'karma-coverage',
                'karma-htmlfile-reporter',
                'karma-phantomjs-launcher'
            ],
            htmlReporter    : {
                outputFile: 'reports/karma-results.html'
            },
            coverageReporter: {
                type: 'html', dir: 'reports/coverage/'
            },
            preprocessors   : {
                'src/app/**/*.js': 'coverage'
            }
        },

        dist: {
            singleRun : true,
            background: false,
            colors    : false,
            reporters : [ 'dots' ],
            browsers  : [ 'PhantomJS' ],
            plugins   : [
                'karma-jasmine',
                'karma-phantomjs-launcher'
            ],
            options   : {
                files: [
                    '<%= config.dir.dist %>/scripts/vendor.*.js',
                    '<%= config.files.vendor.spec %>',
                    '<%= config.dir.dist %>/scripts/app.*.js',
                    '<%= config.files.app.spec %>'
                ]
            }
        }
    }
};