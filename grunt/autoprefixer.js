module.exports = {
    dist: {
        options: {
            browsers: ['last 2 versions', 'ie 8', 'ie 9']
        },
        expand: true,
        cwd: "<%= paths.dest.css %>",
        src: ['*.css'],
        dest: "<%= paths.dest.css %>",
        ext: ".css"
    }
};