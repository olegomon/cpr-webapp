module.exports = {
    options: {
        beautify: true,
        relative: true,
        parseTag: 'generate'
    },

    dev: {
        // replace: true,
        src : '<%= config.dir.temp %>/html/index.html',
        dest: '<%= config.dir.temp %>/',

        options: {
            scripts: {
                app   : [ '<%= config.files.app.js %>', '<%= html2js.build.dest %>' ],
                vendor: '<%= config.files.vendor.js %>'
            },
            styles : {
                app: '<%= config.dir.temp %>/styles/*.css'
            }
        }
    },

    dist: {
        src    : '<%= config.dir.temp %>/html/index.html',
        dest   : '<%= config.dir.dist %>/',
        options: {
            scripts: {
                app   : '<%= config.dir.dist %>/scripts/app.*.js',
                vendor: '<%= config.dir.dist %>/scripts/vendor.*.js'
            },
            styles : {
                app: '<%= config.dir.dist %>/styles/*.css'
            }
        }
    }
};