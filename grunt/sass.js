module.exports = {
  dist: {
      files: {
        '<%= paths.dest.css %>/main.css': '<%= paths.source.css %>/main.scss'
      },
      options: {
        'sourcemap': 'none',
        'style': 'compressed'
      }
    }
  
};