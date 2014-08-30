module.exports = {

    options: {

        // options passed directly to grunt-contrib-connect task
        livereload: true,
        port      : 8080,
        open: true,

        // middleware for serving static resource files
        resources : [
            { path: '.tmp', options: { index: 'index.html' } },
            { path: '.' }
        ]
    },

    dev: {
        options: {
        }
    },

    dist: {
        options: {
            keepalive : true,
            livereload: false,

            resources: [
                { path: '<%= config.dir.dist %>', options: { index: 'index.html' } }
            ]
        }
    }
};