module.exports.config = {

    // load-grunt-configs path
    src: 'grunt/config/*.js',

    app: {
        name   : 'app-ui',
        version: '1.0.0'
    },

    dir: {
        app    : 'src',
        dist   : 'dist',
        temp   : '.tmp',
        reports: 'reports'
    },

    files: {

        app: {

            jsAll: [
                'src/app/**/*.js'
            ],

            js: [
                'src/app/**/*.js',
                '!src/app/**/*.spec.js',
                '!src/app/**/*.mocks.js'
            ],

            spec: [
                'src/app/**/*.spec.js',
                'src/app/**/*.mocks.js'
            ],

            tpls: [
                'src/app/**/*.tpl.html'
            ],

            index: [
                'src/index.tpl.html'
            ],

            styles: {
                all : 'src/styles/**/*.scss'
            }
        },

        vendor: {
            js: [
                'vendor/angular/angular.js',
                'vendor/angular-bootstrap/ui-bootstrap.js',
                'vendor/angular-bootstrap-show-errors/src/showErrors.js',
                'vendor/angular-ui-router/release/angular-ui-router.js',
                'vendor/angular-ui-utils/ui-utils.js'
            ],

            spec: [
                'vendor/angular-mocks/angular-mocks.js'
            ],

            styles: [
            ],

            font: [
                'vendor/font-awesome/fonts/*'
            ]
        }

    }
};
