module.exports = {
  sass: {
    files: ["<%= paths.source.css %>/**/*.scss"],
    tasks: ["sass"],
    options: {
      "spawn": true
    }
  },
  scripts: {
    files: ["<%= paths.source.js %>/**/*.js"],
    tasks: ["uglify"],
    options: {
      "spawn": true
    }
  }
  
};