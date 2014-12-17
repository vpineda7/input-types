module.exports = function(grunt) {

    var paths = {
        source: {
            css: 'css/source',
            js: 'js/source'
        },
        dest: {
            css: 'css',
            js: 'js'
        }
    };

    require('load-grunt-config')(grunt, {
        config: {
            paths: paths
        }
    });

};