module.exports = function (grunt, options) {
    return {
        browser: {
            options: {
                questions: [
                    {
                        config : 'karma.dev.browsers',
                        type   : 'list',
                        message: 'Browsers for Karma',
                        default: 'PhantomJS',
                        choices: [ 'Chrome', 'Safari', 'Firefox', 'PhantomJS', 'IE' ],
                        when: function() {
                            return !grunt.option('browser');
                        },
                        filter : function (value) {
                            return [ value ];
                        }
                    }
                ]
            }
        }
    }
};