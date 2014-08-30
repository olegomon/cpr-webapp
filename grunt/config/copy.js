module.exports = {

    index: {
        files: [
            { '<%= config.dir.temp %>/html/index.html': '<%= config.files.app.index %>' }
        ]
    },

    dev: {
        files: [
            {
                expand : true,
                flatten: true,
                src    : [ '<%= config.files.vendor.font %>' ],
                dest   : '<%= config.dir.temp %>/fonts/'
            },
        ]
    },

    dist: {
        files: [
            {
                // vendor fonts
                expand : true,
                flatten: true,
                src    : [ '<%= config.files.vendor.font %>' ],
                dest   : '<%= config.dir.dist %>/fonts/'
            },
            {

                cwd   : '<%= config.dir.temp %>',
                expand: true,
                src   : [
                    // '<%= merge.translations.dest %>'
                    'assets/translations/**/*.json'
                ],
                dest  : '<%= config.dir.dist %>'
            }
        ]
    }
};