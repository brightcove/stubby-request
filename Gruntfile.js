module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      uses_defaults: ['Gruntfile.js', '*.js'],
      options: {
        curly: true,
        esversion: 6,
        forin: true,
        latedef: true,
        noarg: true,
        // our coding style standard is 80 but be nice here
        maxlen: 120,
        quotmark: 'single',
        undef: true,
        // it would be nice to remove this- get rid of the last few
        expr: true,

        // environment options to help determine what 'undef' should warn on
        devel: true,
        node: true,
        nonstandard: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
};
