module.exports = {
    index : [
        '<%= config.dir.temp %>/index.html'
    ],
    dev : [
        '<%= config.dir.temp %>/*'
    ],
    dist: [
        '<%= config.dir.temp %>/*',
        '<%= config.dir.dist %>/*',
        '<%= config.dir.reports %>/*'
    ]
};