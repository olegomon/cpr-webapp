module.exports = {
    options: {
        removeComments    : true,
        collapseWhitespace: true
    },
    index  : {
        files: {
            '<%= config.dir.dist %>/index.html': '<%= config.dir.dist %>/index.html'
        }
    }
};