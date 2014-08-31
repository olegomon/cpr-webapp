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
            {
                // assets
                cwd   : '<%= config.dir.app %>',
                expand : true,
                src    : [ 'assets/images/**' ],
                dest   : '<%= config.dir.temp %>'
            }
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

                cwd   : '<%= config.dir.app %>',
                expand: true,
                src    : [ 'assets/images/**' ],
                dest  : '<%= config.dir.dist %>/'
            }
        ]
    }
};